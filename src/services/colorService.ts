/**
 * Extracts the dominant color using K-Means clustering.
 * This is much more robust for finding representative colors in complex images.
 */
export async function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Downsample for performance
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, size, size).data;
      } catch (e) {
        console.error("SecurityError: Canvas is tainted. CORS might be missing on the image host.", e);
        // Fallback to a neutral color if we can't read pixels
        resolve("rgb(128, 128, 128)");
        return;
      }
      
      let pixels: number[][] = [];

      const extractPixels = (useFilters: boolean) => {
        const result: number[][] = [];
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          if (a < 128) continue;

          if (useFilters) {
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;
            const avg = (r + g + b) / 3;

            if (avg > 220 && delta < 30) continue;
            if (delta < 15) continue;
            if (avg < 20) continue;
          }

          result.push([r, g, b]);
        }
        return result;
      };

      pixels = extractPixels(true);
      if (pixels.length === 0) {
        console.warn("No pixels passed filters, falling back to all pixels");
        pixels = extractPixels(false);
      }

      if (pixels.length === 0) {
        resolve("rgb(128, 128, 128)");
        return;
      }

      // K-Means with K up to 4
      const k = Math.min(4, pixels.length);
      let centroids = pixels.slice(0, k).map(p => [...p]);
      const assignments = new Array(pixels.length).fill(0);

      // Max 10 iterations for speed
      for (let iter = 0; iter < 10; iter++) {
        let changed = false;

        // Assign
        for (let i = 0; i < pixels.length; i++) {
          let minDist = Infinity;
          let bestK = 0;
          for (let j = 0; j < k; j++) {
            const dist = Math.pow(pixels[i][0] - centroids[j][0], 2) +
                         Math.pow(pixels[i][1] - centroids[j][1], 2) +
                         Math.pow(pixels[i][2] - centroids[j][2], 2);
            if (dist < minDist) {
              minDist = dist;
              bestK = j;
            }
          }
          if (assignments[i] !== bestK) {
            assignments[i] = bestK;
            changed = true;
          }
        }

        if (!changed) break;

        // Update
        const newCentroids = Array.from({ length: k }, () => [0, 0, 0, 0]);
        for (let i = 0; i < pixels.length; i++) {
          const ki = assignments[i];
          newCentroids[ki][0] += pixels[i][0];
          newCentroids[ki][1] += pixels[i][1];
          newCentroids[ki][2] += pixels[i][2];
          newCentroids[ki][3]++;
        }

        for (let j = 0; j < k; j++) {
          if (newCentroids[j][3] > 0) {
            centroids[j][0] = newCentroids[j][0] / newCentroids[j][3];
            centroids[j][1] = newCentroids[j][1] / newCentroids[j][3];
            centroids[j][2] = newCentroids[j][2] / newCentroids[j][3];
          }
        }
      }

      // Pick the "best" centroid
      let bestCentroid = centroids[0];
      let maxScore = -Infinity;

      const counts = new Array(k).fill(0);
      assignments.forEach(ki => counts[ki]++);

      for (let j = 0; j < k; j++) {
        const [r, g, b] = centroids[j];
        
        // Calculate HSB (HSV) values
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        let h = 0;
        if (delta !== 0) {
          if (max === r) h = 60 * (((g - b) / delta) % 6);
          else if (max === g) h = 60 * (((b - r) / delta) + 2);
          else h = 60 * (((r - g) / delta) + 4);
        }
        if (h < 0) h += 360;

        let s = max === 0 ? 0 : delta / max; // Saturation (0-1)
        let v = max / 255;                   // Brightness (0-1)
        
        // User rule: if hue is between 280 and 350 (pink/purple range), 
        // set Saturation and Brightness to exactly 30% (0.3) to avoid clashing with icons.
        if (h > 280 && h < 350) {
          s = 0.3;
          v = 0.3;
          // Update RGB values for the final result if this centroid is picked
          const i = Math.floor(h / 60);
          const f = h / 60 - i;
          const p = v * (1 - s);
          const q = v * (1 - f * s);
          const t = v * (1 - (1 - f) * s);
          let nr = 0, ng = 0, nb = 0;
          switch (i % 6) {
            case 0: nr = v, ng = t, nb = p; break;
            case 1: nr = q, ng = v, nb = p; break;
            case 2: nr = p, ng = v, nb = t; break;
            case 3: nr = p, ng = q, nb = v; break;
            case 4: nr = t, ng = p, nb = v; break;
            case 5: nr = v, ng = p, nb = q; break;
          }
          centroids[j][0] = nr * 255;
          centroids[j][1] = ng * 255;
          centroids[j][2] = nb * 255;
        }

        const [finalR, finalG, finalB] = centroids[j];
        
        // Base score from frequency (Percentage of pixels in this cluster)
        const frequency = counts[j] / pixels.length;
        let score = frequency * 200; // Increase frequency weight
        
        // 1. Saturation Scoring (Target: 30% - 95%)
        // We want vibrant colors, but not pure neon or gray.
        if (s >= 0.25 && s <= 0.95) {
          score += 80; 
        } else if (s < 0.25) {
          score -= (0.25 - s) * 300; // Strong penalty for gray
        }
        
        // 1. Avoid very light colors (Target: 25% - 85% instead of 95%)
        if (v >= 0.25 && v <= 0.85) {
          score += 50;
        } else if (v < 0.25) {
          score -= (0.25 - v) * 500;
        } else if (v > 0.85) {
          score -= (v - 0.85) * 800; // Stronger penalty for very light colors
        }

        // 2. Forbidden Color Avoidance (Icon Gradient: #F5A0FF, #FE2C55)
        const forbiddenColors = [
          [245, 160, 255], // #F5A0FF
          [254, 44, 85]    // #FE2C55
        ];
        let minDistanceToForbidden = Infinity;
        for (const f of forbiddenColors) {
          const dist = Math.sqrt(
            Math.pow(finalR - f[0], 2) + 
            Math.pow(finalG - f[1], 2) + 
            Math.pow(finalB - f[2], 2)
          );
          if (dist < minDistanceToForbidden) minDistanceToForbidden = dist;
        }
        // If color is too close to forbidden (dist < 80), apply heavy penalty
        if (minDistanceToForbidden < 80) {
          score -= (80 - minDistanceToForbidden) * 10;
        }

        // 3. Vibrancy Bonus - Stronger weight for light images
        // S * V is a good measure of "colorfulness"
        score += (s * v) * 200; 
        
        // 4. Saturation boost for very light images
        if (v > 0.8 && s > 0.05) {
          score += s * 400;
        }

        if (score > maxScore) {
          maxScore = score;
          bestCentroid = centroids[j];
        }
      }

      const finalColor = `rgb(${Math.round(bestCentroid[0])}, ${Math.round(bestCentroid[1])}, ${Math.round(bestCentroid[2])})`;
      console.log("Extracted dominant color:", finalColor, "Score:", maxScore);
      resolve(finalColor);
    };
    img.onerror = (err) => {
      console.error("Image load error in colorService:", err);
      reject(err);
    };
    
    const isExternal = imageSrc.startsWith('http') && !imageSrc.includes(window.location.host);
    
    const loadImage = async () => {
      if (!isExternal) {
        img.src = imageSrc;
        return;
      }

      // Try direct fetch first (works for CORS-enabled hosts like Picsum)
      try {
        const response = await fetch(imageSrc, { mode: 'cors', referrerPolicy: 'no-referrer' });
        if (response.ok) {
          const blob = await response.blob();
          img.src = URL.createObjectURL(blob);
          return;
        }
      } catch (e) {
        console.warn("Direct fetch failed, trying proxies...", e);
      }

      // Fallback to proxies for non-CORS hosts
      const proxies = [
        (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      ];

      for (const getProxyUrl of proxies) {
        try {
          const response = await fetch(getProxyUrl(imageSrc), { referrerPolicy: 'no-referrer' });
          if (response.ok) {
            const blob = await response.blob();
            img.src = URL.createObjectURL(blob);
            return;
          }
        } catch (e) {
          console.warn("Proxy attempt failed:", e);
        }
      }

      // Final fallback: direct load (might taint canvas, but better than nothing)
      img.crossOrigin = "Anonymous";
      img.src = imageSrc;
    };

    loadImage();
  });
}

export async function extractPalette(imageSrc: string, count: number = 5): Promise<string[]> {
  return [await extractDominantColor(imageSrc)];
}

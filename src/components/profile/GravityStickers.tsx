import { useEffect, useRef, useMemo } from 'react';
import Matter from 'matter-js';

interface GravityStickersProps {
  stickers: string[];
}

export function GravityStickers({ stickers }: GravityStickersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Duplicate stickers to increase the quantity (20 stickers total)
  const displayStickers = useMemo(() => {
    if (!stickers || stickers.length === 0) return [];
    const result = [];
    for (let i = 0; i < 20; i++) {
      result.push(stickers[i % stickers.length]);
    }
    return result.sort(() => Math.random() - 0.5);
  }, [stickers]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 390;
    const height = 235;

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    const engine = Engine.create();

    // Boundaries
    // Adjust ground and walls to allow visual overlap at the edges and bottom
    const ground = Bodies.rectangle(width / 2, height + 10, width * 2, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-80, height / 2, 100, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 80, height / 2, 100, height * 2, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Create sticker bodies
    const newBodies = displayStickers.map((_, index) => {
      const size = 180 + Math.random() * 70; // 180 to 250 (Bigger sizes)
      const x = Math.random() * (width - size) + size / 2;
      const y = -Math.random() * 500 - 200; // Start above

      // Use a circle with a smaller radius than the visual size for tighter packing
      // This allows the transparent edges of the images to overlap
      const collisionRadius = size * 0.22; 

      const body = Bodies.circle(x, y, collisionRadius, {
        restitution: 0.4, // Less bouncy so they settle nicely
        friction: 0.5,    // More friction to stick together
        frictionAir: 0.02,
        density: 0.05,
        angle: Math.random() * Math.PI * 2, // Random initial rotation
        plugin: { size }
      });

      // Apply random initial velocity so they don't fall straight down
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 15, // Random horizontal velocity
        y: Math.random() * 5 // Slight downward push
      });
      
      // Apply random angular velocity so they spin while falling
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);

      return body;
    });

    Composite.add(engine.world, newBodies);

    // Add mouse control
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Add mouse and touch repel logic
    let isPointerActive = false;
    const handlePointerEnter = () => isPointerActive = true;
    const handlePointerLeave = () => isPointerActive = false;
    
    const container = containerRef.current;
    container.addEventListener('mouseenter', handlePointerEnter);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('touchstart', handlePointerEnter, { passive: true });
    container.addEventListener('touchend', handlePointerLeave, { passive: true });
    container.addEventListener('touchcancel', handlePointerLeave, { passive: true });

    Events.on(engine, 'beforeUpdate', () => {
      if (!isPointerActive) return;
      
      const mousePosition = mouse.position;
      
      newBodies.forEach(body => {
        const dx = body.position.x - mousePosition.x;
        const dy = body.position.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const repelRadius = 120; // Distance within which stickers are repelled
        if (distance < repelRadius && distance > 0) {
          const forceMagnitude = (repelRadius - distance) * 0.005; // Adjust force strength
          Matter.Body.applyForce(body, body.position, {
            x: (dx / distance) * forceMagnitude,
            y: (dy / distance) * forceMagnitude
          });
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync DOM elements with Matter.js bodies
    let animationFrameId: number;
    const update = () => {
      newBodies.forEach((body, index) => {
        const img = imagesRef.current[index];
        if (img) {
          const size = body.plugin.size;
          img.style.width = `${size}px`;
          img.style.height = `${size}px`;
          img.style.left = `${body.position.x - size / 2}px`;
          img.style.top = `${body.position.y - size / 2}px`;
          img.style.transform = `rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handlePointerEnter);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchstart', handlePointerEnter);
      container.removeEventListener('touchend', handlePointerLeave);
      container.removeEventListener('touchcancel', handlePointerLeave);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [displayStickers]);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full overflow-visible"
      style={{ height: 235, zIndex: 5 }}
    >
      {displayStickers.map((url, index) => (
        <img
          key={index}
          ref={el => imagesRef.current[index] = el}
          src={url}
          alt=""
          className="absolute object-contain drop-shadow-xl pointer-events-none"
          draggable={false}
          referrerPolicy="no-referrer"
        />
      ))}
    </div>
  );
}

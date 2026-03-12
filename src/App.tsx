import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// Import new profile components
import { StatusBar } from './components/profile/StatusBar';
import { NavBar } from './components/profile/NavBar';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { BioLinks } from './components/profile/BioLinks';
import { IconTabBar } from './components/profile/IconTabBar';
import { VideoGrid } from './components/profile/VideoGrid';
import { BottomNavBar } from './components/profile/BottomNavBar';
import { SettingsModal } from './components/SettingsModal';
import { BackgroundEditor } from './components/profile/BackgroundEditor';
import { GravityStickers } from './components/profile/GravityStickers';
import { ProfileSwitcherSheet } from './components/profile/ProfileSwitcherSheet';
import { extractDominantColor } from './services/colorService';
import { profiles } from './data/profiles';

// --- Types ---
interface Post {
  id: number;
  imageUrl: string;
  views?: string;
  label?: string;
  isDraft?: boolean;
  isPinned?: boolean;
}

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState<string>('rhode');
  const activeProfile = profiles[activeProfileId];

  const [showSettings, setShowSettings] = useState(false);
  const [showBackgroundEditor, setShowBackgroundEditor] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [profileBackground, setProfileBackground] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>(activeProfile.theme.backgroundColor);
  const [scale, setScale] = useState(1);

  // Update background color when profile changes
  useEffect(() => {
    if (!profileBackground) {
      setBackgroundColor(activeProfile.theme.backgroundColor);
    }
  }, [activeProfileId, activeProfile.theme.backgroundColor, profileBackground]);

  // Determine if text should be light (white) based on background color brightness
  const isLightText = (() => {
    if (profileBackground) return true; // Assume image backgrounds need light text for now
    const hex = backgroundColor.replace('#', '');
    if (hex.length !== 6) return true;
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness < 155;
  })();

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // On smaller screens (like mobile), don't force a margin so it can fill the screen better
      const isMobile = viewportWidth < 600;
      const targetHeight = isMobile ? 844 : 844 + 40;
      const targetWidth = isMobile ? 390 : 390 + 40;
      
      const scaleH = viewportHeight / targetHeight;
      const scaleW = viewportWidth / targetWidth;
      
      setScale(Math.min(1, scaleH, scaleW));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveBackground = async (imageData: string) => {
    console.log("App: handleSaveBackground called");
    setProfileBackground(imageData);
    setShowBackgroundEditor(false);
    
    // Extract color using the robust logic (now with proxy support)
    try {
      const color = await extractDominantColor(imageData);
      console.log("App: Extracted color successfully:", color);
      setBackgroundColor(color);
    } catch (error) {
      console.error("App: Color extraction failed even with proxy:", error);
      // Final fallback to a neutral light color
      setBackgroundColor('#f8f8f8');
    }
  };
  
  // ... rest of the component

  return (
    <div className="grid min-h-[100dvh] w-full place-items-center bg-[#f0f0f0] overflow-hidden relative">
      {/* iPhone frame - 390x844 from Figma */}
      <div
        className="relative flex flex-col overflow-hidden bg-white shadow-2xl origin-center transition-transform duration-300"
        style={{ 
          width: 390, 
          height: 844, 
          backgroundColor: '#FFFFFF',
          transform: `scale(${scale})`
        }}
      >
        <AnimatePresence>
          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBackgroundEditor && (
            <BackgroundEditor 
              onSave={handleSaveBackground} 
              onClose={() => setShowBackgroundEditor(false)} 
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col flex-1 relative">
          {/* Top Background Color - 235px height */}
          <div 
            className="absolute top-0 left-0 right-0 z-0"
            style={{ height: 235, backgroundColor }}
          />

          {/* Profile Background - at the very top, bottom layer */}
          {profileBackground && (
            <div 
              className="absolute top-0 left-0 right-0 z-0 overflow-hidden"
              style={{ height: 235 }}
            >
              <img 
                src={profileBackground} 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* UI Layer */}
          <div className="relative z-10 flex flex-col flex-1">
            {/* Gravity Stickers - Fixed background layer for physics, z-20 */}
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-auto" style={{ height: 235 }}>
              <GravityStickers stickers={activeProfile.stickers} />
            </div>

            {/* Status Bar + Nav Bar group - Fixed at top, z-30 */}
            <div className="absolute top-0 left-0 right-0 z-30 flex flex-col pointer-events-none">
              <StatusBar lightMode={isLightText} />
              <NavBar 
                onOpenSettings={() => setShowSettings(true)} 
                lightMode={isLightText}
              />
            </div>

            {/* Scrollable content area - z-40, topmost layer */}
            <LayoutGroup>
              <div className="absolute inset-0 z-40 overflow-y-auto no-scrollbar pointer-events-none">
                <div className="relative flex flex-col min-h-full">
                  {/* Empty space at the top - lets clicks pass through to Nav/Stickers */}
                  <div className="relative w-full shrink-0 pointer-events-none" style={{ height: 201 }}>
                  </div>

                  {/* Container with rounded top corners */}
                  <div 
                    className="bg-white/50 backdrop-blur-[28.6px] rounded-t-[24px] min-h-[818px] pb-24 relative pointer-events-auto flex-1"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(28.6px)',
                      WebkitBackdropFilter: 'blur(28.6px)',
                      borderRadius: '24px 24px 0px 0px',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Profile Header with Avatar, Name, Stats */}
                    <div 
                      className="cursor-pointer"
                      onClick={() => setShowBackgroundEditor(true)}
                    >
                      <ProfileHeader 
                        profile={activeProfile} 
                        onSwitchProfile={() => setShowProfileSwitcher(true)}
                      />
                    </div>

                    {/* Bio & Links */}
                    <BioLinks profile={activeProfile} />

                    {/* Content section */}
                    <motion.div 
                      layout
                      transition={{ 
                        layout: { duration: 0.25, ease: "easeOut" } 
                      }}
                      className="flex flex-col items-center mt-4" 
                      style={{ gap: 1 }}
                    >
                      {/* Tab bar */}
                      <IconTabBar />

                      {/* Video post grid */}
                      <VideoGrid posts={activeProfile.posts} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </LayoutGroup>
          </div>

          {/* Bottom Nav Bar - fixed at bottom */}
          <div className="relative z-50 pointer-events-auto">
            <BottomNavBar />
          </div>

          {/* Profile Switcher Action Sheet */}
          <ProfileSwitcherSheet 
            isOpen={showProfileSwitcher}
            onClose={() => setShowProfileSwitcher(false)}
            activeProfileId={activeProfileId}
            onSelect={(id) => {
              setActiveProfileId(id);
              setProfileBackground(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}


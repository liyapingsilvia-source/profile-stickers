import { motion, AnimatePresence } from 'motion/react';
import { profiles } from '../../data/profiles';
import { Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeProfileId: string;
  onSelect: (id: string) => void;
}

export function ProfileSwitcherSheet({ isOpen, onClose, activeProfileId, onSelect }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[60] bg-black/40"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl overflow-hidden flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            
            <div className="px-5 pb-8 pt-2 flex flex-col gap-2">
              <h3 className="text-center font-semibold text-sm text-gray-500 mb-2">Switch Account</h3>
              
              {Object.values(profiles).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelect(p.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-100 transition-colors active:bg-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                      style={{ backgroundColor: p.avatar.bgColor }}
                    >
                      {p.avatar.imageUrl ? (
                        <img src={p.avatar.imageUrl} alt={p.displayName} className="w-full h-full object-cover" />
                      ) : (
                        p.avatar.text
                      )}
                    </div>
                    <span className="font-medium text-base">{p.displayName}</span>
                  </div>
                  {activeProfileId === p.id && <Check size={20} className="text-blue-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

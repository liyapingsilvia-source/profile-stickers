import { ProfileData } from "../../data/profiles";
import { ChevronDown } from "lucide-react";

export function ProfileHeader({ profile, onSwitchProfile }: { profile: ProfileData, onSwitchProfile?: (e: React.MouseEvent) => void }) {
  return (
    <div className="relative flex items-start justify-between px-5 pb-0 pt-[28px]" style={{ minHeight: 154 }}>
      {/* Left side: Name, Username, Stats */}
      <div className="flex flex-col gap-[12px]">
        {/* Name */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => {
              if (onSwitchProfile) {
                e.stopPropagation();
                onSwitchProfile(e);
              }
            }}
          >
            <span
              className="font-sans text-[32px] font-bold leading-[35px] text-current"
              style={{ letterSpacing: 0 }}
            >
              {profile.displayName}
            </span>
            <ChevronDown size={20} className="mt-1 opacity-80" />
          </div>
          <span
            className="font-sans text-[13px] font-normal leading-[16.9px]"
            style={{ color: "inherit", opacity: 0.6, letterSpacing: 0 }}
          >
            {profile.username}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center" style={{ gap: 24 }}>
          <StatItem value={profile.stats.following} label="Following" />
          <StatItem value={profile.stats.followers} label="Followers" />
          <StatItem value={profile.stats.likes} label="Likes" />
        </div>
      </div>

      {/* Right side: Avatar image */}
      <div className="absolute flex-shrink-0" style={{ width: 96, height: 96, right: 20, top: 20 }}>
        <div 
          className="h-full w-full rounded-full flex items-center justify-center overflow-hidden" 
          style={{ backgroundColor: profile.avatar.bgColor }}
        >
          {profile.avatar.imageUrl ? (
            <img src={profile.avatar.imageUrl} alt={profile.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-sans font-bold text-[24px] tracking-tight">{profile.avatar.text}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span
        className="font-sans text-[15px] font-bold leading-[19.5px] text-current"
        style={{ letterSpacing: 0 }}
      >
        {value}
      </span>
      <span
        className="font-sans text-[13px] font-normal leading-[16.9px]"
        style={{ color: "inherit", opacity: 0.6, letterSpacing: 0 }}
      >
        {label}
      </span>
    </div>
  );
}

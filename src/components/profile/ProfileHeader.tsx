export function ProfileHeader() {
  return (
    <div className="relative flex items-start justify-between px-5 pb-0 pt-[28px]" style={{ minHeight: 154 }}>
      {/* Left side: Name, Username, Stats */}
      <div className="flex flex-col gap-[12px]">
        {/* Name */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span
              className="font-sans text-[32px] font-bold leading-[35px] text-current"
              style={{ letterSpacing: 0 }}
            >
              rhode skin
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span
            className="font-sans text-[13px] font-normal leading-[16.9px]"
            style={{ color: "inherit", opacity: 0.6, letterSpacing: 0 }}
          >
            @rhode
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center" style={{ gap: 24 }}>
          <StatItem value="505" label="Following" />
          <StatItem value="413M" label="Followers" />
          <StatItem value="863.9M" label="Likes" />
        </div>
      </div>

      {/* Right side: Avatar image */}
      <div className="absolute flex-shrink-0" style={{ width: 96, height: 96, right: 20, top: 20 }}>
        <div className="h-full w-full rounded-full flex items-center justify-center bg-[#D8323C]">
          <span className="text-white font-sans font-bold text-[24px] tracking-tight">rhode</span>
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

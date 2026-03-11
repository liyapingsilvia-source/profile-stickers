export function BioLinks({ lightMode }: { lightMode?: boolean }) {
  const color = lightMode ? "white" : "black";
  return (
    <div
      className="flex flex-col px-5 mt-[-18px]"
      style={{ gap: 0 }}
    >
      {/* Pronouns */}
      <div className="flex items-center mt-2" style={{ height: 18 }}>
        <span
          className="font-sans text-[13px] font-normal leading-[18.2px]"
          style={{ letterSpacing: 0, color: "inherit", opacity: 0.6 }}
        >
          He/him/his
        </span>
      </div>
      {/* Bio text */}
      <div className="flex flex-col mt-1">
        <span
          className="font-sans text-[13px] font-normal leading-[18.2px]"
          style={{ letterSpacing: 0, color }}
        >
          One of everything really good ✨<br/>
          a new philosophy on skincare developed by<br/>
          @haileybieber.<br/>
          vegan·crueltu-free·dermatologist-developed
        </span>
      </div>
      {/* Link */}
      <div className="flex items-center gap-1 mt-1" style={{ height: 18 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13A5 5 0 0 0 17.07 13L20.61 9.46A5 5 0 0 0 13.54 2.39L12.12 3.81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 11A5 5 0 0 0 6.93 11L3.39 14.54A5 5 0 0 0 10.46 21.61L11.88 20.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          className="font-sans text-[13px] font-semibold leading-[18.2px]"
          style={{ letterSpacing: 0, color }}
        >
          rhodeskin.com
        </span>
      </div>

    </div>
  )
}

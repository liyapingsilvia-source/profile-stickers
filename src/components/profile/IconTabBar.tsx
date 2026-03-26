import { useState } from "react"
import { ChevronDown } from "lucide-react"

const tabs = [
  {
    id: "posts",
    icon: (props: any) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.85415 19.7083C9.85415 19.9615 9.64894 20.1667 9.39581 20.1667H4.58331C3.06453 20.1667 1.83331 18.9355 1.83331 17.4167V12.6042C1.83331 12.351 2.03852 12.1458 2.29165 12.1458H8.93748C9.44374 12.1458 9.85415 12.5562 9.85415 13.0625V19.7083Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.1666 17.4167C20.1666 18.9355 18.9354 20.1667 17.4166 20.1667H12.6041C12.351 20.1667 12.1458 19.9615 12.1458 19.7083V13.0625C12.1458 12.5562 12.5562 12.1458 13.0625 12.1458H19.7083C19.9614 12.1458 20.1666 12.351 20.1666 12.6042V17.4167Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.85415 8.93751C9.85415 9.44377 9.44374 9.85418 8.93748 9.85418H2.29165C2.03852 9.85418 1.83331 9.64897 1.83331 9.39584V4.58334C1.83331 3.06456 3.06453 1.83334 4.58331 1.83334H9.39581C9.64894 1.83334 9.85415 2.03855 9.85415 2.29168V8.93751Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.4166 1.83334C18.9354 1.83334 20.1666 3.06456 20.1666 4.58334V9.39584C20.1666 9.64897 19.9614 9.85418 19.7083 9.85418H13.0625C12.5562 9.85418 12.1458 9.44377 12.1458 8.93751V2.29168C12.1458 2.03855 12.351 1.83334 12.6041 1.83334H17.4166Z" fill="currentColor"/>
      </svg>
    ),
    hasDropdown: false,
    active: true,
  },
  {
    id: "reposts",
    icon: (props: any) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_1172_34901)">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.74374 2.0957C3.99359 1.78904 4.46217 1.7885 4.71249 2.09473L8.24472 6.41895C8.57779 6.82711 8.28726 7.43848 7.76035 7.43848H5.73398V12.6895C5.73411 14.277 7.02143 15.5642 8.60898 15.5645H10.0152C10.8437 15.5645 11.5152 16.236 11.5152 17.0645C11.5151 17.8928 10.8436 18.5645 10.0152 18.5645H8.60898C5.36457 18.5642 2.73411 15.9339 2.73398 12.6895V7.43848H0.705658C0.179221 7.4382 -0.1113 6.82716 0.221283 6.41895L3.74374 2.0957ZM11.3902 1.43359C14.6348 1.43359 17.2651 4.06501 17.2652 7.30957V12.5605H19.2935C19.8202 12.5605 20.1115 13.1718 19.7789 13.5801L16.2555 17.9033C16.0056 18.2099 15.538 18.2104 15.2877 17.9043L11.7555 13.5801C11.4223 13.1719 11.7129 12.5605 12.2398 12.5605H14.2652V7.30957C14.2651 5.72186 12.978 4.43457 11.3902 4.43457H9.98398C9.1559 4.43435 8.48424 3.76264 8.48398 2.93457C8.48411 2.10639 9.15582 1.43381 9.98398 1.43359H11.3902Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_1172_34901">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    hasDropdown: false,
    active: false,
  },
]

export function IconTabBar({ lightMode }: { lightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState("posts")
  const activeColor = lightMode ? "white" : "rgba(0,0,0,1)";
  const inactiveColor = lightMode ? "rgba(255,255,255,0.48)" : "rgba(0,0,0,0.48)";
  const separatorColor = lightMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <div className="flex flex-col items-center" style={{ width: '100%', height: 42 }}>
      <div className="flex w-full" style={{ height: 42 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className="relative flex flex-1 items-center justify-center overflow-hidden"
              style={{ height: 42, padding: "10px" }}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-end gap-0">
                <Icon
                  size={22}
                  strokeWidth={2}
                  color={isActive ? activeColor : inactiveColor}
                  fill={isActive && tab.id === "posts" ? activeColor : "none"}
                />
                {tab.hasDropdown && (
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    color={isActive ? activeColor : inactiveColor}
                  />
                )}
              </div>
              {/* Indicator */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: 45,
                    height: 2,
                    backgroundColor: activeColor,
                    borderRadius: 1,
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
      {/* Bottom line separator */}
      <div
        className="w-full"
        style={{
          height: 0.5,
          backgroundColor: separatorColor,
        }}
      />
    </div>
  )
}

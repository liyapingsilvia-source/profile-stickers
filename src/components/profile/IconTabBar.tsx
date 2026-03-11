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
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M17.0801 3.25384C17.7253 3.83329 17.7253 4.84431 17.0801 5.42376L14.2656 7.95013C13.8546 8.31904 13.2224 8.28494 12.8535 7.87395C12.4846 7.46296 12.5187 6.83076 12.9297 6.46184L14.3916 5.14935L8.49609 5.14934C7.35968 5.14934 6.56699 5.14975 5.9502 5.20013C5.34516 5.24956 4.99673 5.34235 4.7334 5.47649C4.16928 5.76401 3.71044 6.22297 3.42285 6.78704C3.28869 7.05034 3.19594 7.39892 3.14648 8.00384C3.09612 8.62056 3.0957 9.41352 3.0957 10.5497L3.0957 12.2275C3.0955 12.7796 2.64786 13.2275 2.0957 13.2275C1.54354 13.2275 1.0959 12.7796 1.0957 12.2275L1.0957 10.5497C1.0957 9.44635 1.09474 8.55783 1.15332 7.84075C1.21287 7.11222 1.33902 6.4719 1.64062 5.87981C2.12 4.93915 2.88547 4.17358 3.82617 3.69427C4.41832 3.39267 5.05847 3.26649 5.78711 3.20696C6.50427 3.14837 7.39253 3.14934 8.49609 3.14934L13.9697 3.14935L12.9297 2.21575C12.5187 1.84684 12.4846 1.21463 12.8535 0.803642C13.2224 0.392677 13.8546 0.35858 14.2656 0.72747L17.0801 3.25384ZM20.9043 11.4609C20.9043 12.5644 20.9053 13.4527 20.8467 14.1699C20.7871 14.8985 20.661 15.5386 20.3594 16.1308C19.88 17.0716 19.1146 17.837 18.1738 18.3163C17.5816 18.618 16.9416 18.7441 16.2129 18.8036C15.4957 18.8622 14.6075 18.8613 13.5039 18.8613L8.03906 18.8613L9.06934 19.7831C9.4807 20.1513 9.51538 20.7837 9.14746 21.1952C8.77927 21.6067 8.14694 21.6414 7.73535 21.2734L4.92383 18.7587C4.2757 18.179 4.2756 17.1646 4.92383 16.5849L7.73535 14.0702C8.14686 13.7024 8.77928 13.7372 9.14746 14.1484C9.51546 14.5599 9.48054 15.1923 9.06934 15.5605L7.61523 16.8613L13.5039 16.8613C14.6403 16.8613 15.433 16.8609 16.0498 16.8105C16.655 16.761 17.0032 16.6683 17.2666 16.5341C17.8308 16.2465 18.2896 15.7878 18.5771 15.2236C18.7113 14.9602 18.8041 14.6119 18.8535 14.0068C18.9039 13.39 18.9043 12.5973 18.9043 11.4609L18.9043 9.78313C18.9045 9.23104 19.3521 8.78313 19.9043 8.78313C20.4564 8.78313 20.9041 9.23104 20.9043 9.78313L20.9043 11.4609Z" fill="currentColor"/>
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

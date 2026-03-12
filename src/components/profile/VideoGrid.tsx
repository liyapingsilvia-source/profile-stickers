import { Play } from "lucide-react"
import { VideoItem } from "../../data/profiles"

function VideoThumbnail({ item }: { item: VideoItem; key?: any }) {
  const isDraftBadge = item.badge && item.badgeColor === "rgba(245,245,245,1)"
  const isPinnedBadge = item.badge && item.badgeColor === "rgba(254,44,85,1)"

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{ height: 173 }}
    >
      <img
        src={item.src}
        alt=""
        className="h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 52,
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.24) 100%)",
        }}
      />
      {/* View count */}
      <div
        className="absolute bottom-[6px] left-[6px] flex items-center gap-[3px]"
      >
        <Play
          size={14}
          fill="rgba(250,250,250,1)"
          color="rgba(250,250,250,1)"
        />
        <span
          className="font-sans text-[13px] font-medium leading-[16.9px] text-white"
          style={{
            letterSpacing: 0.127,
            textShadow: "0px 0.5px 0.5px rgba(0,0,0,0.15)",
          }}
        >
          {item.views}
        </span>
      </div>
      {/* Badge */}
      {isDraftBadge && (
        <div
          className="absolute left-[4px] top-[4px] flex items-center rounded px-[5px] py-[1px]"
          style={{ backgroundColor: item.badgeColor }}
        >
          <span
            className="font-sans text-[12px] font-medium leading-[15.6px] text-black"
            style={{ letterSpacing: 0.161 }}
          >
            {item.badge}
          </span>
        </div>
      )}
      {isPinnedBadge && (
        <div
          className="absolute left-[4px] top-[4px] flex items-center rounded px-[5px] py-[1px]"
          style={{ backgroundColor: item.badgeColor }}
        >
          <span
            className="font-sans text-[12px] font-medium leading-[15.6px] text-white"
            style={{ letterSpacing: 0.161 }}
          >
            {item.badge}
          </span>
        </div>
      )}
    </div>
  )
}

function VideoRow({ items }: { items: VideoItem[] }) {
  return (
    <div
      className="flex items-center"
      style={{ width: '100%', height: 173, gap: 1.5 }}
    >
      {items.map((item, i) => (
        <VideoThumbnail key={i} item={item} />
      ))}
    </div>
  )
}

export function VideoGrid({ posts }: { posts: VideoItem[] }) {
  // Chunk posts into arrays of 3
  const rows = [];
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3));
  }

  return (
    <div
      className="flex flex-col bg-white"
      style={{ width: '100%', gap: 1.5 }}
    >
      {rows.map((row, i) => (
        <VideoRow key={i} items={row} />
      ))}
    </div>
  )
}

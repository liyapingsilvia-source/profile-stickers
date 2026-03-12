export interface VideoItem {
  src: string;
  views: string;
  badge?: string;
  badgeColor?: string;
}

export interface ProfileData {
  id: string;
  displayName: string;
  username: string;
  stats: {
    following: string;
    followers: string;
    likes: string;
  };
  avatar: {
    bgColor: string;
    text: string;
    imageUrl?: string;
  };
  bio: {
    pronouns?: string;
    text: string;
    link: string;
  };
  theme: {
    backgroundColor: string;
  };
  posts: VideoItem[];
  stickers: string[];
}

const defaultPosts = [
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e7e8950e.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e7f7e290.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e7fca2bf.webp", views: "16.5K" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e8002987.webp", views: "1,202" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e804fc17.webp", views: "712" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e878be4f.webp", views: "10.1K" },
];

const jellycatPosts = [
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b239319bed7.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b2394902ad7.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b2396303e7d.webp", views: "16.5K" },
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b23965e0cbd.webp", views: "1,202" },
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b23978e1acd.webp", views: "712" },
  { src: "https://picui.ogmua.cn/s1/2026/03/12/69b2397aafc28.webp", views: "10.1K" },
];

const rhodeStickers = [
  "https://picui.ogmua.cn/s1/2026/03/11/69b127096d353.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b12709b9c44.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b1270a4b2ea.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b1270abc683.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b1270b0247d.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b1271498039.webp",
  "https://picui.ogmua.cn/s1/2026/03/11/69b12714be5b1.webp"
];

const jellycatStickers = [
  "https://picui.ogmua.cn/s1/2026/03/12/69b26e2e09033.webp"
];

export const profiles: Record<string, ProfileData> = {
  rhode: {
    id: 'rhode',
    displayName: 'rhode skin',
    username: '@rhode',
    stats: {
      following: '505',
      followers: '413M',
      likes: '863.9M',
    },
    avatar: {
      bgColor: '#D8323C',
      text: 'rhode',
    },
    bio: {
      pronouns: 'He/him/his',
      text: 'One of everything really good ✨\na new philosophy on skincare developed by\n@haileybieber.\nvegan·crueltu-free·dermatologist-developed',
      link: 'rhodeskin.com',
    },
    theme: {
      backgroundColor: '#361D1E',
    },
    posts: defaultPosts,
    stickers: rhodeStickers,
  },
  jellycat: {
    id: 'jellycat',
    displayName: 'Jellycat',
    username: '@jellycat',
    stats: {
      following: '505',
      followers: '413M',
      likes: '863.9M',
    },
    avatar: {
      bgColor: '#D8323C',
      text: 'JC',
      imageUrl: 'https://picui.ogmua.cn/s1/2026/03/12/69b23772b0984.webp',
    },
    bio: {
      text: 'The official Jellycat Instagram 💙\nFollow for fun and updates #Sharingjoy',
      link: 'linktr.ee/jellycatlondon',
    },
    theme: {
      backgroundColor: '#CB3039',
    },
    posts: jellycatPosts,
    stickers: jellycatStickers,
  }
};

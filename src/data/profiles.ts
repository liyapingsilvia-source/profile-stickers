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
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e1b6d16f2.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e1b6d8a2e.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e1b709fd3.webp", views: "16.5K" },
  { src: "https://picui.ogmua.cn/s1/2026/03/11/69b12e8002987.webp", views: "1,202" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e1b724966.webp", views: "712" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e1bf6ce10.webp", views: "10.1K" },
];

const jellycatPosts = [
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e33882d6c.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e340485e3.webp", views: "16.5K", badge: "Pinned", badgeColor: "rgba(254,44,85,1)" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e342e5cbb.webp", views: "16.5K" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e3460b836.webp", views: "1,202" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e346dc243.webp", views: "712" },
  { src: "https://picui.ogmua.cn/s1/2026/03/26/69c4e34cc1463.webp", views: "10.1K" },
];

const rhodeStickers = [
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e27fe50da.webp",
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e280191f0.webp",
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e27fc1cd6.webp",
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e2805ea7b.webp",
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e28087c36.webp",
  "https://picui.ogmua.cn/s1/2026/03/26/69c4e289aca86.webp"
];

const jellycatStickers = [
  "https://picui.ogmua.cn/s1/2026/03/26/69c52793432d3.webp"
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
      imageUrl: 'https://picui.ogmua.cn/s1/2026/03/26/69c526ba1e477.webp',
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

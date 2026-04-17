// Hardcoded demo data — replace with Prisma queries in production

export interface Score {
  visual: number;
  difficulty: number;
  depth: number;
  story: number;
  grindLevel: number;
  innovation: number;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  titleRaw: string | null;
  coverImage: string | null;
  platform: string | null;
  genre: string | null;
  developer: string | null;
  releaseYear: number | null;
  body: string | null;
  published: boolean;
  scores: Score | null;
}

export const DEMO_GAMES: Game[] = [
  {
    id: "1",
    slug: "elden-ring",
    title: "艾尔登法环",
    titleRaw: "Elden Ring",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp",
    platform: "PS5 / PC / Xbox",
    genre: "动作RPG",
    developer: "FromSoftware",
    releaseYear: 2022,
    body: "FromSoftware迄今为止规模最大的开放世界动作RPG。游戏将《黑暗之魂》系列的硬核战斗与《权力的游戏》风格的宏大世界观完美融合。玩家将扮演褪色者，在充满危险的Lands Between中寻找艾尔登法环碎片，成为新的艾尔登之王。战斗系统保留了魂系列的精髓，同时加入了灵马冲刺和跳跃攻击等新要素，使得战斗节奏更加流畅多变。",
    published: true,
    scores: {
      visual: 9.5,
      difficulty: 9.0,
      depth: 9.8,
      story: 8.5,
      grindLevel: 8.0,
      innovation: 8.5,
    },
  },
  {
    id: "2",
    slug: "baldurs-gate-3",
    title: "博德之门3",
    titleRaw: "Baldur's Gate 3",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.webp",
    platform: "PC / PS5 / Xbox",
    genre: "CRPG",
    developer: "Larian Studios",
    releaseYear: 2023,
    body: "Larian Studios的史诗级CRPG巨作，基于D&D 5e规则打造。玩家将扮演被夺心魔寄生的一名冒险者，在寻找解除寄生束缚的过程中，卷入了博德之门三派系之间的权力斗争。游戏提供前所未有的选择自由度，几乎每个决定都会影响故事走向，超过17000种结局组合等待玩家探索。回合制战斗策略深度极高，配合糟糕的随机性经常带来意想不到的戏剧性时刻。",
    published: true,
    scores: {
      visual: 8.5,
      difficulty: 8.0,
      depth: 9.9,
      story: 9.8,
      grindLevel: 7.5,
      innovation: 8.0,
    },
  },
  {
    id: "3",
    slug: "zelda-totk",
    title: "塞尔达传说：王国之泪",
    titleRaw: "The Legend of Zelda: Tears of the Kingdom",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vqt.webp",
    platform: "Nintendo Switch",
    genre: "动作冒险",
    developer: "Nintendo EPD",
    releaseYear: 2023,
    body: "《塞尔达传说：旷野之息》的正统续作，林克在海拉鲁时间线的冒险迎来全新篇章。本作引入了左纳乌装置和究极手等创新机制，允许玩家自由组合各种材料创造独特的交通工具和工具。地面上与天空中的双重冒险空间极大拓展了探索维度。",
    published: true,
    scores: {
      visual: 8.0,
      difficulty: 7.0,
      depth: 9.5,
      story: 9.0,
      grindLevel: 6.5,
      innovation: 9.8,
    },
  },
  {
    id: "4",
    slug: "starfield",
    title: "星空",
    titleRaw: "Starfield",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vnm.webp",
    platform: "PC / Xbox",
    genre: "太空RPG",
    developer: "Bethesda Game Studios",
    releaseYear: 2023,
    body: "Bethesda Game Studios二十五年来的全新IP，玩家将在超过1000颗可探索行星的银河系中书写自己的传奇。基于全新的Creation Engine 2打造，融合了Bethesda标志性的玩家驱动叙事与深度角色自定义系统。",
    published: true,
    scores: {
      visual: 7.5,
      difficulty: 6.5,
      depth: 8.5,
      story: 8.0,
      grindLevel: 9.0,
      innovation: 7.0,
    },
  },
  {
    id: "5",
    slug: "alan-wake-2",
    title: "心灵杀手2",
    titleRaw: "Alan Wake 2",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5z4n.webp",
    platform: "PC / PS5 / Xbox",
    genre: "心理恐怖",
    developer: "Remedy Entertainment",
    releaseYear: 2023,
    body: "Remedy Entertainment打造的心理恐怖巅峰之作，时隔十三年后推出的正统续作。游戏采用了创新的双主角系统，玩家需要在FBI探员Saga Anderson和作家Alan Wake两个视角间切换来揭开谜团。",
    published: true,
    scores: {
      visual: 9.2,
      difficulty: 7.5,
      depth: 8.8,
      story: 9.5,
      grindLevel: 5.5,
      innovation: 9.0,
    },
  },
  {
    id: "6",
    slug: "final-fantasy-xvi",
    title: "最终幻想16",
    titleRaw: "Final Fantasy XVI",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p0k.webp",
    platform: "PS5",
    genre: "动作RPG",
    developer: "Square Enix",
    releaseYear: 2023,
    body: "史克威尔艾尼克斯为PS5主机打造的《最终幻想》系列革新之作。游戏彻底颠覆了系列传统，采用了更加黑暗、写实的中世纪奇幻世界观，以及即时动作战斗系统。",
    published: true,
    scores: {
      visual: 9.0,
      difficulty: 7.5,
      depth: 8.0,
      story: 9.2,
      grindLevel: 7.0,
      innovation: 7.5,
    },
  },
];

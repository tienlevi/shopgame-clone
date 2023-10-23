interface Item {
  id: number;
  name: string;
  img: string;
  price: number;
  origin: string;
}

const productData: Item[] = [
  {
    id: 1,
    name: "Remnant II",
    img: require("../Asset/Image/Game/Remnant-II.jpg"),
    price: 50,
    origin: "Game Steam",
  },
  {
    id: 2,
    name: "Dyling Light 2",
    img: require("../Asset/Image/Game/dyling-light-2.jpg"),
    price: 60,
    origin: "Game Steam",
  },
  {
    id: 3,
    name: "FIFA 24",
    img: require("../Asset/Image/Game/fifa-24.jpg"),
    price: 60,
    origin: "EA Games",
  },
  {
    id: 4,
    name: "Mortal Kombat 1",
    img: require("../Asset/Image/Game/Mortal-Kombat-1-key-art.png"),
    price: 60,
    origin: "Game Steam",
  },
  {
    id: 5,
    name: "Cities: Skylines 2",
    img: require("../Asset/Image/Game/Cities_Skylines_2_Keyart-2.jpg"),
    price: 20,
    origin: "Game Steam",
  },
  {
    id: 6,
    name: "Battlefield 4",
    img: require("../Asset/Image/Game/bf4.png"),
    price: 20,
    origin: "EA Games",
  },
  {
    id: 7,
    name: "FIFA 23",
    img: require("../Asset/Image/Game/fifa-23.png"),
    price: 60,
    origin: "EA Games",
  },
  {
    id: 8,
    name: "The Sims 4",
    img: require("../Asset/Image/Game/Sims4_Rebrand.png"),
    price: 30,
    origin: "EA Games",
  },
  {
    id: 9,
    name: "Battlefield 2042",
    img: require("../Asset/Image/Game/HD-wallpaper-battlefield-2042-battle-trooper-verses.jpg"),
    price: 40,
    origin: "EA Games",
  },
  {
    id: 10,
    name: "Dead Space",
    img: require("../Asset/Image/Game/EGS_DeadSpace_MotiveStudio_S2_1200x1600.jpg"),
    price: 45,
    origin: "EA Games",
  },
  {
    id: 11,
    name: "Call Of Duty Modern Warface 2022",
    img: require("../Asset/Image/Game/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg"),
    price: 60,
    origin: "Game Steam",
  },
  {
    id: 12,
    name: "The Witcher 3: Wild Hunt",
    img: require("../Asset/Image/Game/The-Witcher3.jpg"),
    price: 30,
    origin: "Game Steam",
  },
  {
    id: 13,
    name: "GTA V",
    img: require("../Asset/Image/Game/Grand_Theft_Auto_V.png"),
    price: 20,
    origin: "Game Steam",
  },
  {
    id: 14,
    name: "Mortal Kombat 11",
    img: require("../Asset/Image/Game/Mortal_Kombat_11_cover_art.png"),
    price: 25,
    origin: "Game Steam",
  },
  {
    id: 15,
    name: "Dead Island 2",
    img: require("../Asset/Image/Game/Dead-Island-2.jpg"),
    price: 20,
    origin: "Game Steam",
  },
  {
    id: 16,
    name: "Far cry 6",
    img: require("../Asset/Image/Game/Farcry6.jpg"),
    price: 50,
    origin: "Game Steam",
  },
  {
    id: 17,
    name: "Marvel’s Spider-Man: Miles Morales",
    img: require("../Asset/Image/Game/Spider-Man-Miles-Morales.png"),
    price: 60,
    origin: "Game Steam",
  },
];

export default productData;

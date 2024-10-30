const getRandomTheme = () => {
  const themes = [
    "Return of the Gods",
    "The Legend of Yamblag",
    "Valkyries in Battle",
    "Secrets of the Rune Keepers",
    "Witchcraft and Magic",
    "Treasures of the Aesir",
    "The Time of Tyr",
    "Mysteries of Midgard",
    "Guardians of Yarnsaxa",
    "Saga of Fenrir",
    "Journey to Asgard",
    "Fate Weaving by the Norns",
    "Confrontation with the Ice Giant",
    "True Love",
    "Mystery of Hel",
    "Runes and Magic",
    "Friendship with Elves",
    "Fire and Ice",
    "Ancient Dragons",
    "Legacy of the Ancestors",
  ];

  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

export default getRandomTheme;

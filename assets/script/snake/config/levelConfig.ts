import { Vec3 } from "cc";
import { LevelConfig } from "../interfaces/gameplayInterface";

const levelConfig: Array<LevelConfig> = [
  {
    board: {
      levelArr: [
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    snake: {
      parts: [
        { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 6, y: 5 },
        { x: 7, y: 5 },
        { x: 7, y: 6 },
      ],
    },
    speedUp: {
      interval: 4,
      startingVal: 0.5,
      changeVal: 0.1,
      maxSpeedUp: 3,
    },
  },
];

const validLevelList = [0];

function getRandomLevel() {
  return levelConfig[
    validLevelList[Math.floor(Math.random() * validLevelList.length)]
  ];
}

export function getLevelConfig() {
  return getRandomLevel();
}

import { Node, Vec2, Vec3 } from "cc";
import { ITEM_OBJECT_TYPE } from "../enum/itemObject";
import { TILE_TYPE } from "../enum/tile";

import { SnakeSprite } from "../sprite/spritesheet/snakeSprite";

export interface BoardConfig {
  levelArr: Array<Array<number>>;
}

export interface SnakeConfig {
  parts: Array<{ x: number; y: number }>;
}

export interface LevelConfig {
  board: BoardConfig;
  snake: SnakeConfig;
  speedUp: speedUpConfig;
}

export interface TileConfig {
  type: TILE_TYPE;
  node?: Node;
  pos: Vec2;
}

export interface SnakePartInfo {
  sprite: SnakeSprite;
  idx: Vec2;
  pos: Vec2;
  digesting: boolean;
}

export interface ItemObjectListInfo {
  node?: Node;
  type: ITEM_OBJECT_TYPE;
  idx: Vec2;
}

export interface speedUpConfig {
  interval: number;
  startingVal: number;
  changeVal: number;
  maxSpeedUp: number;
}

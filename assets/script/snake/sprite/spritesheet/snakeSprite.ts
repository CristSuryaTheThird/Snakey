import { Enum, _decorator } from "cc";
import { BaseSprite } from "../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../enum/asset";
import { SNAKE_BODY_PART } from "../../enum/snakeBodyPart";
const { ccclass, property } = _decorator;

@ccclass("SnakeSprite")
export class SnakeSprite extends BaseSprite {
  constructor() {
    super("SnakeSprite", ASSET_KEY.SNAKE_SPRITE, 0);
  }

  @property(Number)
  public readonly bodyPart?: number;

  public adjustSnakePart(part: SNAKE_BODY_PART) {
    if (part === SNAKE_BODY_PART.HEAD) {
      this.setFrame(0);
    } else if (part === SNAKE_BODY_PART.BODY) {
      this.setFrame(1);
    } else if (part === SNAKE_BODY_PART.DIGEST) {
      this.setFrame(2);
    } else if (part === SNAKE_BODY_PART.TAIL) {
      this.setFrame(3);
    } else if (part === SNAKE_BODY_PART.TURN) {
      this.setFrame(4);
    } else if (part === SNAKE_BODY_PART.TURN_DIGEST) {
      this.setFrame(5);
    }
    this.reload();
  }
}

import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const { ccclass, property } = _decorator;

@ccclass("KeyRight")
export class KeyRight extends BaseSprite {
  constructor() {
    super("KeyRight", ASSET_KEY.KEYPAD_SPRITE, 5);
  }
}

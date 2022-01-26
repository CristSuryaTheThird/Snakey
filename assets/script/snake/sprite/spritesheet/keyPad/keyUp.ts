import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const { ccclass, property } = _decorator;

@ccclass("KeyUp")
export class KeyUp extends BaseSprite {
  constructor() {
    super("KeyUp", ASSET_KEY.KEYPAD_SPRITE, 1);
  }
}

import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const { ccclass, property } = _decorator;

@ccclass("KeyLeft")
export class KeyLeft extends BaseSprite {
  constructor() {
    super("KeyLeft", ASSET_KEY.KEYPAD_SPRITE, 3);
  }
}

import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const { ccclass, property } = _decorator;

@ccclass("KeyDown")
export class KeyDown extends BaseSprite {
  constructor() {
    super("KeyDown", ASSET_KEY.KEYPAD_SPRITE, 4);
  }
}

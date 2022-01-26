import { tween, _decorator } from "cc";
import { BaseSprite } from "../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../enum/asset";
const { ccclass } = _decorator;

@ccclass("PromptScreen")
export class PromptScreen extends BaseSprite {
  constructor() {
    super("WhiteBox", ASSET_KEY.WHITE_BOX_SPRITE);
  }

  public returnToNormal(duration: number) {
    this.setOpacity(155);
    tween(this.sprite)
      .to(duration, {
        color: { a: 0 },
      })
      .start();
  }

  public dim(duration: number) {
    this.setOpacity(0);
    tween(this.sprite)
      .to(duration, {
        color: { a: 155 },
      })
      .start();
  }
}

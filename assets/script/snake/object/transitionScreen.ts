import { tween, _decorator } from "cc";
import { BaseSprite } from "../../lib/sprite/baseSprite";
import { TRANSITION_KEY } from "../enum/transition";
import { ASSET_KEY } from "../enum/asset";
const { ccclass } = _decorator;

@ccclass("TransitionScreen")
export class TransitionScreen extends BaseSprite {
  constructor() {
    super("WhiteBox", ASSET_KEY.WHITE_BOX_SPRITE);
  }

  public fadeIn(duration: number) {
    this.setOpacity(0);
    tween(this.sprite)
      .to(
        duration,
        {
          color: { a: 255 },
        },
        {
          onStart: () => {
            this.node.emit(TRANSITION_KEY.FADE_IN_START);
          },
          onComplete: () => {
            this.node.emit(TRANSITION_KEY.FADE_IN_COMPLETE);
          },
        }
      )
      .start();
  }

  public fadeOut(duration: number) {
    this.setOpacity(255);
    tween(this.sprite)
      .to(
        duration,
        {
          color: { a: 0 },
        },
        {
          onStart: () => {
            this.node.emit(TRANSITION_KEY.FADE_OUT_START);
          },
          onComplete: () => {
            this.node.emit(TRANSITION_KEY.FADE_OUT_COMPLETE);
          },
        }
      )
      .start();
  }
}

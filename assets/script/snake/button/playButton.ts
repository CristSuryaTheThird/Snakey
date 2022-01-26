import { _decorator, Graphics, Component, UITransform, Node } from "cc";
import { BUTTON_EVENT } from "../enum/button";
const { ccclass, property } = _decorator;

@ccclass("PlayButton")
export class PlayButton extends Component {
  @property(Graphics)
  public readonly buttonBackground?: Graphics;

  private uiTransform?: UITransform | null;
  onLoad() {
    this.uiTransform = this.getComponent(UITransform);
    this.drawGraphics();
  }
  start() {
    this.node.on(
      Node.EventType.TOUCH_END,
      () => {
        this.node.emit(BUTTON_EVENT.PLAY_BUTTON_CLICK.toString());
      },
      this
    );
  }
  private drawGraphics() {
    const { buttonBackground } = this;
    const config = this.getBackgroundConfig();

    if (!buttonBackground || !config) return;

    const { x, y, width, height } = config;
    buttonBackground.clear();
    buttonBackground.fillRect(x, y, width, height);
  }

  private getBackgroundConfig() {
    const { uiTransform } = this;

    if (!uiTransform) return undefined;

    const { width, height } = uiTransform;
    return {
      x: width * -0.5,
      y: height * -0.5,
      width: width,
      height: height,
    };
  }
}

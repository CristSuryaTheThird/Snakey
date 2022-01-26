import { _decorator, Graphics, Component, UITransform, Node, Enum } from "cc";
import { BUTTON_EVENT } from "../enum/button";
const { ccclass, property } = _decorator;

@ccclass("PromptButton")
export class PromptButton extends Component {
  @property(Graphics)
  public readonly buttonBackground?: Graphics;

  @property(Node)
  public readonly mainParentNode?: Node;

  @property({ type: Enum(BUTTON_EVENT) })
  public readonly eventType?: BUTTON_EVENT;

  private uiTransform?: UITransform | null;
  onLoad() {
    this.uiTransform = this.getComponent(UITransform);
    this.drawGraphics();
  }
  start() {
    this.node.on(
      Node.EventType.TOUCH_END,
      () => {
        if (!this.eventType) return;
        this.mainParentNode?.emit(this.eventType.toString());
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

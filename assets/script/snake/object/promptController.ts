import { _decorator, Component, Graphics, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PromptController")
export class PromptController extends Component {
  @property(Graphics)
  public readonly outerBg?: Graphics;

  @property(Graphics)
  public readonly innerBg?: Graphics;

  onLoad() {
    this.draw();
  }

  private draw() {
    this.drawOuterBg();
    this.drawInnerBg();
  }

  private drawOuterBg() {
    const transform = this.outerBg?.getComponent(UITransform);
    if (!transform) return;
    const config = this.getBgConfig(transform);

    if (!config) return;

    const { x, y, width, height, r } = config;

    this.outerBg?.clear();
    this.outerBg?.roundRect(x, y, width, height, r);
    this.outerBg?.fill();
  }

  private drawInnerBg() {
    const transform = this.innerBg?.getComponent(UITransform);
    if (!transform) return;
    const config = this.getBgConfig(transform);

    if (!config) return;

    const { x, y, width, height, r } = config;

    this.innerBg?.clear();
    this.innerBg?.roundRect(x, y, width, height, r);
    this.innerBg?.fill();
  }

  private getBgConfig(uiTransform: UITransform) {
    if (!uiTransform) return undefined;

    const { width, height } = uiTransform;

    return {
      x: width * -0.5,
      y: height * -0.5,
      width,
      height,
      r: 25,
    };
  }

  public activateNode() {
    this.node.active = true;
  }
}

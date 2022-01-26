import {
  _decorator,
  Component,
  Node,
  systemEvent,
  SystemEvent,
  Vec2,
} from "cc";
import { BUTTON_EVENT } from "../../../enum/button";
import { DIRECTION } from "../../../enum/direction";
import { GAMEPLAY_EVENT } from "../../../enum/gameplayEvent";
import { KeyDown } from "./keyDown";
import { KeyLeft } from "./keyLeft";
import { KeyRight } from "./keyRight";
import { KeyUp } from "./keyUp";
const { ccclass, property } = _decorator;

@ccclass("InputController")
export class InputController extends Component {
  @property(KeyLeft)
  public readonly keyLeft?: KeyLeft;
  @property(KeyRight)
  public readonly keyRight?: KeyRight;
  @property(KeyUp)
  public readonly keyUp?: KeyUp;
  @property(KeyDown)
  public readonly keyDown?: KeyDown;

  start() {
    this.setupKeyBoardInput();
    this.setupKeyPadInput();
  }

  private setupKeyBoardInput() {
    this.node.once(Node.EventType.NODE_DESTROYED, () => {
      systemEvent.off(SystemEvent.EventType.KEY_DOWN);
    });
    systemEvent.on(SystemEvent.EventType.KEY_DOWN, (key) => {
      switch (key.keyCode) {
        case 37:
          this.emitMove(DIRECTION.LEFT);
          break;

        case 38:
          this.emitMove(DIRECTION.UP);
          break;

        case 39:
          this.emitMove(DIRECTION.RIGHT);
          break;

        case 40:
          this.emitMove(DIRECTION.DOWN);
          break;
        default:
          break;
      }
    });
  }

  private setupKeyPadInput() {
    this.keyLeft?.node.on(Node.EventType.TOUCH_START, () => {
      this.emitMove(DIRECTION.LEFT);
    });
    this.keyUp?.node.on(Node.EventType.TOUCH_START, () => {
      this.emitMove(DIRECTION.UP);
    });
    this.keyRight?.node.on(Node.EventType.TOUCH_START, () => {
      this.emitMove(DIRECTION.RIGHT);
    });
    this.keyDown?.node.on(Node.EventType.TOUCH_START, () => {
      this.emitMove(DIRECTION.DOWN);
    });
  }

  private emitMove(dir: DIRECTION) {
    const moveDir = new Vec2(0, 0);
    switch (dir) {
      case DIRECTION.UP:
        moveDir.set(0, -1);
        break;
      case DIRECTION.DOWN:
        moveDir.set(0, 1);
        break;
      case DIRECTION.LEFT:
        moveDir.set(-1, 0);
        break;
      case DIRECTION.RIGHT:
        moveDir.set(1, 0);
        break;
      default:
        break;
    }
    this.node.emit(GAMEPLAY_EVENT.MOVEMENT_INPUT, moveDir);
  }
}

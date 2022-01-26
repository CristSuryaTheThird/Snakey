import {
  Component,
  Prefab,
  _decorator,
  Node,
  Vec2,
  instantiate,
  Vec3,
} from "cc";
import { GAMEPLAY_EVENT } from "../enum/gameplayEvent";
import { ITEM_OBJECT_TYPE } from "../enum/itemObject";
import { ItemObjectListInfo } from "../interfaces/gameplayInterface";

const { ccclass, property } = _decorator;

@ccclass("ItemObjectController")
export class ItemObjectController extends Component {
  @property(Prefab)
  private readonly applePrefab?: Prefab;

  @property(Node)
  private readonly objectRoot?: Node;

  private allItemInBoard = new Array<ItemObjectListInfo>();

  public get AllItemInBoard() {
    return this.allItemInBoard;
  }

  public spawnObject(type: ITEM_OBJECT_TYPE, idx: Vec2, pos: Vec2) {
    if (!this.applePrefab) return;
    const objPref = instantiate(this.applePrefab);
    objPref.setParent(this.objectRoot || this.node);
    objPref.setPosition(pos.x, pos.y);
    objPref.setScale(new Vec3(1.2, 1.2, 0));
    objPref.active = true;

    this.AllItemInBoard.push({
      node: objPref,
      type: type,
      idx: idx,
    });
  }

  public findItemObjectInIdx(idx: Vec2) {
    const Object = this.allItemInBoard.find((item) => {
      const { x, y } = item.idx;
      return idx.x === x && idx.y === y;
    });
    if (Object) {
      this.removeObject(Object);
      this.node.emit(GAMEPLAY_EVENT.CONSUME_ITEM, Object.type);
    }
  }

  private removeObject(obj: ItemObjectListInfo) {
    this.allItemInBoard.forEach((item, idx) => {
      if (item === obj) {
        this.allItemInBoard.splice(idx, 1);
        obj.node?.destroy();
      }
    });
  }
}

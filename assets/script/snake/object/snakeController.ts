import {
  Component,
  Prefab,
  _decorator,
  Node,
  Vec2,
  instantiate,
  Vec3,
} from "cc";
import { ASSET_KEY } from "../enum/asset";
import { GAMEPLAY_EVENT } from "../enum/gameplayEvent";
import { ITEM_OBJECT_TYPE } from "../enum/itemObject";
import { SNAKE_BODY_PART } from "../enum/snakeBodyPart";
import { SnakeConfig, SnakePartInfo } from "../interfaces/gameplayInterface";
import { SnakeSprite } from "../sprite/spritesheet/snakeSprite";
import { SfxManager } from "./sfx/sfxManager";
const { ccclass, property } = _decorator;

@ccclass("SnakeController")
export class SnakeController extends Component {
  @property(Prefab)
  private readonly snakePrefab?: Prefab;

  @property(Node)
  private readonly snakeRoot?: Node;

  private readonly SNAKE_SIZE = 28;

  private snakePartsArr = new Array<SnakePartInfo>();

  private snakeMoveDir = new Vec2();

  private currTailIdx = new Vec2();

  private hasPendingInput = false;

  public get HEAD() {
    return this.snakePartsArr[0];
  }

  public get NECK() {
    return this.snakePartsArr[1];
  }

  public get TAIL() {
    return this.snakePartsArr[this.snakePartsArr.length - 1];
  }

  public get SnakePartsArr() {
    return this.snakePartsArr;
  }

  public generateSnake(snakeParts: SnakeConfig) {
    snakeParts.parts.forEach((item) => {
      const { x, y } = this.getSnakePos(item.x, item.y);
      this.createSnakePart(new Vec2(item.x, item.y), new Vec2(x, y));
    });
    this.initializeSnake();
  }

  private createSnakePart(idx: Vec2, pos: Vec2) {
    if (!this.snakePrefab) return;

    const snakePref = instantiate(this.snakePrefab);
    snakePref.setParent(this.snakeRoot || this.node);
    snakePref.setPosition(pos.x, pos.y);
    snakePref.active = true;

    const snakeSprite = snakePref.getComponent(SnakeSprite);
    if (!snakeSprite) return;

    this.snakePartsArr.push({
      sprite: snakeSprite,
      idx: new Vec2(idx.x, idx.y),
      pos: new Vec2(pos.x, pos.y),
      digesting: false,
    });
  }

  private initializeSnake() {
    if (!this.HEAD || !this.NECK) return;

    const headDir = this.getSnakeDirBetweenParts(this.HEAD.idx, this.NECK.idx);
    this.snakeMoveDir.set(headDir.x, headDir.y);

    this.updateTexture();
    this.currTailIdx.set(this.TAIL.idx.x, this.TAIL.idx.y);
  }

  private updateTexture() {
    this.snakePartsArr.forEach((item, idx) => {
      this.adjustSnakeTexture(item, idx);
    });
  }
  private adjustSnakeTexture(currPart: SnakePartInfo, idx: number) {
    const { sprite } = currPart;

    if (currPart === this.HEAD) {
      sprite.adjustSnakePart(SNAKE_BODY_PART.HEAD);
      sprite.setRotation(
        this.getPartRotationByDirection(
          this.snakeMoveDir.x,
          this.snakeMoveDir.y
        )
      );
    } else {
      if (currPart === this.TAIL) {
        const tailRot = this.getSnakeDirBetweenParts(
          this.snakePartsArr[idx - 1].idx,
          this.snakePartsArr[idx].idx
        );
        sprite.adjustSnakePart(SNAKE_BODY_PART.TAIL);
        sprite.setRotation(
          this.getPartRotationByDirection(tailRot.x, tailRot.y)
        );
      } else {
        const topBottomRot = this.getSnakeDirBetweenParts(
          this.snakePartsArr[idx - 1].idx,
          this.snakePartsArr[idx].idx
        );
        const bottomTopRot = this.getSnakeDirBetweenParts(
          this.snakePartsArr[idx].idx,
          this.snakePartsArr[idx + 1].idx
        );
        const noTurning =
          topBottomRot.x - bottomTopRot.x === 0 ||
          topBottomRot.y - bottomTopRot.y === 0;
        if (noTurning) {
          if (!currPart.digesting) {
            sprite.adjustSnakePart(SNAKE_BODY_PART.BODY);
          } else {
            sprite.adjustSnakePart(SNAKE_BODY_PART.DIGEST);
          }

          sprite.setRotation(
            this.getPartRotationByDirection(topBottomRot.x, topBottomRot.y)
          );
        } else {
          if (!currPart.digesting) {
            sprite.adjustSnakePart(SNAKE_BODY_PART.TURN);
          } else {
            sprite.adjustSnakePart(SNAKE_BODY_PART.TURN_DIGEST);
          }

          sprite.setRotation(
            this.getPartRotationByDirectionWithTurning(
              topBottomRot,
              bottomTopRot
            )
          );
        }
      }
    }
  }

  private getSnakePos(x: number, y: number) {
    return {
      x: x * this.SNAKE_SIZE,
      y: -y * this.SNAKE_SIZE,
    };
  }

  private getSnakeDirBetweenParts(part1: Vec2, part2: Vec2): Vec2 {
    const dir = new Vec2(part1.x - part2.x, part1.y - part2.y);
    return dir;
  }

  private getPartRotationByDirection(
    directionX: number,
    directionY: number
  ): Vec3 {
    if (directionY === -1) {
      return new Vec3(0, 0, 0);
    } else if (directionX === 1) {
      return new Vec3(0, 0, -90);
    } else if (directionY === 1) {
      return new Vec3(0, 0, -180);
    } else if (directionX === -1) {
      return new Vec3(0, 0, -270);
    }
    return new Vec3(0, 0, 0);
  }

  private getPartRotationByDirectionWithTurning(
    firstDir: Vec2,
    secondDir: Vec2
  ): Vec3 {
    let xRot = 0;
    let yRot = 0;
    let zRot = 0;

    if (firstDir.y === -1) {
      xRot = 180;
      if (secondDir.x === 1) {
        yRot = 180;
      }
    } else if (firstDir.y === 0) {
      if (firstDir.x === -1) {
        yRot = 180;
      }

      if (secondDir.y === 1) {
        xRot = 180;
      }
    } else if (firstDir.y === 1) {
      if (secondDir.x === 1) {
        yRot = 180;
      }
    }
    return new Vec3(xRot, yRot, zRot);
  }

  private moveFoodInDigest(idx: number) {
    if (idx >= this.snakePartsArr.length - 1 || idx < 0) return;
    if (idx < this.snakePartsArr.length - 2) {
      this.snakePartsArr[idx].digesting = false;
      this.snakePartsArr[idx + 1].digesting = true;
    } else {
      this.snakePartsArr[idx].digesting = false;
      const { x, y } = this.getSnakePos(this.currTailIdx.x, this.currTailIdx.y);

      this.createSnakePart(this.currTailIdx, new Vec2(x, y));
      this.node.emit(GAMEPLAY_EVENT.FINISH_DIGEST);
    }
  }

  public updateScheaduler(interval: number) {
    this.unschedule(this.moveSnake);
    this.schedule(this.moveSnake, interval);
  }

  public checkSnakeVaidity(
    snakeParts: SnakeConfig,
    levelBoard: Array<Array<number>>
  ): boolean {
    // let isValid = false;

    if (snakeParts.parts.length < 3) {
      return false;
    }

    const maxX = levelBoard[0].length;
    const maxY = levelBoard.length;

    for (let i = 0; i < snakeParts.parts.length; i++) {
      const snakeXIdx = snakeParts.parts[i].x;
      const snakeYIdx = snakeParts.parts[i].y;

      if (snakeXIdx >= maxX || snakeYIdx >= maxY) {
        return false;
      }

      if (levelBoard[snakeYIdx][snakeXIdx] === 1) {
        return false;
      }

      if (i !== 0) {
        if (
          snakeParts.parts[i].x === snakeParts.parts[0].x &&
          snakeParts.parts[i].y === snakeParts.parts[0].y
        ) {
          return false;
        }
      }

      if (i < snakeParts.parts.length - 1) {
        const snakeXPartDist =
          snakeParts.parts[i].x - snakeParts.parts[i + 1].x;
        const snakeYPartDist =
          snakeParts.parts[i].y - snakeParts.parts[i + 1].y;
        const partDist = Math.abs(snakeXPartDist + snakeYPartDist);

        if (partDist !== 1) {
          return false;
        }
      }
    }

    return true;
  }

  public setupSnakeScheaduler(interval: number) {
    this.schedule(this.moveSnake, interval);
  }

  public changeDir(dir: Vec2) {
    let valid = true;

    if (dir.x !== 0 && dir.y !== 0) valid = false;
    if (
      this.snakeMoveDir.x + dir.x === 0 ||
      this.snakeMoveDir.y + dir.y === 0
    ) {
      valid = false;
    }
    if (valid && !this.hasPendingInput) {
      this.hasPendingInput = true;
      this.snakeMoveDir.set(dir.x, dir.y);
    }
  }

  public moveSnake() {
    let frontPartIdx = new Vec2(0, 0);
    let frontPartPos = new Vec2(0, 0);
    let allDigestingPart: Array<number> = [];
    this.snakePartsArr.forEach((part, idx) => {
      const { x, y } = part.idx;
      const { sprite } = part;
      if (part === this.HEAD) {
        frontPartIdx.set(part.idx.x, part.idx.y);
        frontPartPos.set(part.pos.x, part.pos.y);
        part.idx.set(x + this.snakeMoveDir.x, y + this.snakeMoveDir.y);
        const newPos = this.getSnakePos(part.idx.x, part.idx.y);
        part.pos.set(newPos.x, newPos.y);
      } else {
        if (part.digesting) {
          allDigestingPart.push(idx);
        }
        const tempPartIdx = new Vec2(part.idx.x, part.idx.y);
        const tempPartPos = new Vec2(part.pos.x, part.pos.y);
        part.idx.set(frontPartIdx.x, frontPartIdx.y);
        part.pos.set(frontPartPos.x, frontPartPos.y);
        frontPartIdx.set(tempPartIdx.x, tempPartIdx.y);
        frontPartPos.set(tempPartPos.x, tempPartPos.y);
      }
      sprite.node.setPosition(part.pos.x, part.pos.y);
    });
    if (allDigestingPart.length > 0) {
      allDigestingPart.reverse().forEach((item) => {
        this.moveFoodInDigest(item);
      });
    }
    this.updateTexture();
    this.currTailIdx.set(this.TAIL.idx.x, this.TAIL.idx.y);
    this.node.emit(GAMEPLAY_EVENT.MOVEMENT_FINISH);
    if (this.hasPendingInput) {
      SfxManager.instance.playAudio(ASSET_KEY.TURN_SFX);
      this.hasPendingInput = false;
    }
  }

  public shutOffSnakeScheaduler() {
    this.unschedule(this.moveSnake);
  }

  public digestingFood(type: ITEM_OBJECT_TYPE) {
    if (type === ITEM_OBJECT_TYPE.APPLE) {
      this.snakePartsArr[1].digesting = true;
      this.adjustSnakeTexture(this.snakePartsArr[1], 1);
    }
  }
}

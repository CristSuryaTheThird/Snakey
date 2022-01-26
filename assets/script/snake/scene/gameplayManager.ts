import {
  Component,
  director,
  Label,
  LabelComponent,
  Node,
  Vec2,
  _decorator,
} from "cc";
import { LevelBoardManager } from "../object/levelBoardManager";
import { getLevelConfig } from "../config/levelConfig";
import { SnakeConfig, speedUpConfig } from "../interfaces/gameplayInterface";
import { SnakeController } from "../object/snakeController";
import { TransitionScreen } from "../object/transitionScreen";
import { TRANSITION_KEY } from "../enum/transition";
import { InputController } from "../sprite/spritesheet/keyPad/inputController";
import { GAMEPLAY_EVENT } from "../enum/gameplayEvent";
import { ItemObjectController } from "../object/itemObjectController";
import { ITEM_OBJECT_TYPE } from "../enum/itemObject";
import { LOCAL_STORAGE_KEY } from "../../lib/enum/localStorage";
import {
  getValueFromLocalStorage,
  updateLocalStorageValue,
} from "../../lib/util/localStorage";
import { BaseLabel } from "../../lib/text/baseLabel";
import { PromptScreen } from "../object/promptScreen";
import { PromptController } from "../object/promptController";
import { BUTTON_EVENT } from "../enum/button";
import { SCENE_KEY } from "../enum/scene";
import { SfxManager } from "../object/sfx/sfxManager";
import { ASSET_KEY } from "../enum/asset";
const { ccclass, property } = _decorator;

@ccclass("GamePlayManager")
export class GamePlayManager extends Component {
  @property(LevelBoardManager)
  private readonly levelBoardManager?: LevelBoardManager;

  @property(SnakeController)
  private readonly snakeController?: SnakeController;

  @property(ItemObjectController)
  private readonly itemObjectController?: ItemObjectController;

  @property(TransitionScreen)
  public readonly transitionScreen?: TransitionScreen;

  @property(InputController)
  public readonly inputController?: InputController;

  @property(BaseLabel)
  public readonly scoreLabel?: BaseLabel;

  @property(BaseLabel)
  public readonly higscoreLabel?: BaseLabel;

  @property(BaseLabel)
  public readonly gameOverScoreLabel?: BaseLabel;

  @property(PromptScreen)
  public readonly promptDimScreen?: PromptScreen;

  @property(PromptController)
  public readonly invalidSnakePrompt?: PromptController;

  @property(PromptController)
  public readonly gameoverPrompt?: PromptController;

  @property(Node)
  public readonly pressKeyText?: Node;

  private gameReady = false;

  private gameStart = false;

  private currLevelBoard: Array<Array<number>> = [];

  private playerScore = 0;
  private highScore = 0;

  private startingSpeed = 0;
  private changeSpeed = 0;
  private currSpeed = 0;
  private interval = 0;
  private currCtr = 0;
  private maxSpeedUp = 0;
  private numberOfSpeedUp = 0;

  start() {
    this.initVar();
    this.adjustTransitionScreen();
    this.generateBoardAndSnake();
    this.setupPlayerInput();
    this.setupObjectSpawnControl();
    this.setupScoreAndSpeedUpListener();
    this.setupPromptEventListener();

    this.snakeController?.node.on(GAMEPLAY_EVENT.MOVEMENT_FINISH, () => {
      this.checkMovementFinish();
    });
  }

  private initVar() {
    this.gameReady = false;
    this.gameStart = false;
    this.playerScore = 0;
    this.currCtr = 0;
    this.numberOfSpeedUp = 0;
    this.highScore =
      getValueFromLocalStorage(LOCAL_STORAGE_KEY.HIGHSCORE_DATA) || 0;
    this.higscoreLabel?.setText(this.highScore.toString());
  }

  private getSnakeSpeedUpConfig(config: speedUpConfig) {
    this.interval = config.interval;
    this.startingSpeed = config.startingVal;
    this.changeSpeed = config.changeVal;
    this.maxSpeedUp = config.maxSpeedUp;
  }

  private setupScoreAndSpeedUpListener() {
    this.snakeController?.node.on(GAMEPLAY_EVENT.FINISH_DIGEST, () => {
      this.playerScore += 1;
      if (this.playerScore > this.highScore) {
        this.highScore = this.playerScore;
        this.higscoreLabel?.setText(this.highScore.toString());
        updateLocalStorageValue(
          LOCAL_STORAGE_KEY.HIGHSCORE_DATA,
          this.highScore.toString()
        );
      }
      this.scoreLabel?.setText(this.playerScore.toString());

      if (this.numberOfSpeedUp >= this.maxSpeedUp) return;
      this.currCtr += 1;
      if (this.currCtr >= this.interval) {
        this.currCtr = 0;
        this.numberOfSpeedUp += 1;
        this.currSpeed -= this.changeSpeed;
        this.snakeController?.updateScheaduler(this.currSpeed);
      }
    });
  }

  private adjustTransitionScreen() {
    this.transitionScreen?.fadeOut(0.75);
    this.transitionScreen?.node.once(
      TRANSITION_KEY.FADE_OUT_COMPLETE,
      () => {
        this.gameReady = true;
      },
      this
    );
  }

  private setupObjectSpawnControl() {
    this.createObjectItem(ITEM_OBJECT_TYPE.APPLE);
    this.itemObjectController?.node.on(
      GAMEPLAY_EVENT.CONSUME_ITEM,
      (type: ITEM_OBJECT_TYPE) => {
        SfxManager.instance.playAudio(ASSET_KEY.EAT_SFX);
        if (type === ITEM_OBJECT_TYPE.APPLE) {
          this.createObjectItem(ITEM_OBJECT_TYPE.APPLE);
        }
        this.snakeController?.digestingFood(type);
      }
    );
  }

  createObjectItem(type: ITEM_OBJECT_TYPE) {
    const availableSpawnIdx = this.getAvailableSpawnIdx();
    if (availableSpawnIdx.length <= 0) return;

    const randomAvailableSpawnIdx: Vec2 =
      availableSpawnIdx[Math.floor(Math.random() * availableSpawnIdx.length)];

    const { x, y } = randomAvailableSpawnIdx;
    const spawnPos = this.levelBoardManager?.getTilePos(x, y);

    this.itemObjectController?.spawnObject(
      type,
      randomAvailableSpawnIdx,
      new Vec2(spawnPos?.x, spawnPos?.y)
    );
  }

  private generateBoardAndSnake() {
    const { board, snake, speedUp } = getLevelConfig();
    this.levelBoardManager?.generateLevelBoard(board.levelArr);
    this.currLevelBoard = board.levelArr;

    const validity = this.snakeController?.checkSnakeVaidity(
      snake,
      board.levelArr
    );

    if (!validity) {
      this.promptDimScreen?.dim(0);
      this.invalidSnakePrompt?.activateNode();
    } else {
      this.getSnakeSpeedUpConfig(speedUp);
      this.snakeController?.generateSnake(snake);
    }
  }

  private setupPlayerInput() {
    this.inputController?.node.on(
      GAMEPLAY_EVENT.MOVEMENT_INPUT,
      (moveDir: Vec2) => {
        if (!this.gameReady) return;
        if (!this.gameStart) {
          if (this.pressKeyText) {
            this.pressKeyText.active = false;
          }
          this.gameStart = true;
          this.snakeController?.moveSnake();
          this.snakeController?.setupSnakeScheaduler(this.startingSpeed);
          this.currSpeed = this.startingSpeed;
        } else {
          this.snakeController?.changeDir(moveDir);
        }
      }
    );
  }

  private setupPromptEventListener() {
    this.invalidSnakePrompt?.node.once(
      BUTTON_EVENT.CANCLE_BUTTON_CLICK.toString(),
      () => {
        this.transitionScreen?.fadeIn(0.75);
        this.changeScene(SCENE_KEY.LANDING);
      }
    );

    this.gameoverPrompt?.node.once(
      BUTTON_EVENT.CANCLE_BUTTON_CLICK.toString(),
      () => {
        this.transitionScreen?.fadeIn(0.75);
        this.changeScene(SCENE_KEY.LANDING);
      }
    );

    this.gameoverPrompt?.node.once(
      BUTTON_EVENT.RETRY_BUTTON_CLICK.toString(),
      () => {
        this.transitionScreen?.fadeIn(0.75);
        this.changeScene(SCENE_KEY.GAME);
      }
    );
  }

  private changeScene(sceneName: SCENE_KEY) {
    this.transitionScreen?.node.once(TRANSITION_KEY.FADE_IN_COMPLETE, () => {
      director.loadScene(sceneName);
    });
  }

  private getAvailableSpawnIdx(): Array<Vec2> {
    const currentObjectList = this.itemObjectController?.AllItemInBoard.map(
      (item) => {
        return item.idx;
      }
    );
    const currentSnakeParts = this.snakeController?.SnakePartsArr.map(
      (item) => {
        return item.idx;
      }
    );

    const availablePosition: Array<Vec2> = [];
    this.currLevelBoard.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        const notWall = col !== 1;

        const currIdxVec = new Vec2(colIdx, rowIdx);

        const overlapWithSnakeIdx = currentSnakeParts?.filter((item) => {
          return item.x === currIdxVec.x && item.y === currIdxVec.y;
        });
        const notBlockedBySnake =
          overlapWithSnakeIdx === undefined || overlapWithSnakeIdx.length === 0;

        const overlapWithObj = currentObjectList?.filter((item) => {
          return item.x === currIdxVec.x && item.y === currIdxVec.y;
        });
        const notBlockedByObj =
          overlapWithObj === undefined || overlapWithObj.length === 0;

        if (notWall && notBlockedBySnake && notBlockedByObj) {
          availablePosition.push(new Vec2(colIdx, rowIdx));
        }
      });
    });
    return availablePosition;
  }

  private checkMovementFinish() {
    const snakeHeadIdx = this.snakeController?.HEAD.idx;
    if (!snakeHeadIdx) return;

    this.checkForGameOver(snakeHeadIdx);
    this.itemObjectController?.findItemObjectInIdx(snakeHeadIdx);
  }

  private checkForGameOver(snakeHeadIdx: Vec2) {
    const snakePartsArr = this.snakeController?.SnakePartsArr;
    if (!snakePartsArr) return;

    const maxBoardX = this.currLevelBoard[0].length;
    const maxBoardY = this.currLevelBoard.length;

    const outOfBound =
      snakeHeadIdx.x >= maxBoardX ||
      snakeHeadIdx.x < 0 ||
      snakeHeadIdx.y >= maxBoardY ||
      snakeHeadIdx.y < 0;

    const wallCrash = outOfBound
      ? false
      : this.currLevelBoard[snakeHeadIdx.y][snakeHeadIdx.x] === 1;

    let eatSelf = false;
    snakePartsArr.forEach((item) => {
      if (item !== this.snakeController?.HEAD) {
        if (item.idx.x === snakeHeadIdx.x && item.idx.y === snakeHeadIdx.y) {
          eatSelf = true;
        }
      }
    });

    if (outOfBound || wallCrash || eatSelf) {
      SfxManager.instance.playAudio(ASSET_KEY.CRASH_SFX);
      this.snakeController?.node.emit(GAMEPLAY_EVENT.GAME_OVER);
      this.snakeController?.shutOffSnakeScheaduler();
      this.promptDimScreen?.dim(0);
      this.gameoverPrompt?.activateNode();
      this.gameOverScoreLabel?.setText(this.playerScore.toString());
    }
  }
}

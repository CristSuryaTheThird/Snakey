import { Component, _decorator } from "cc";
import { ASSET_KEY } from "../../enum/asset";
import { SfxCrash } from "./sfxCrash";
import { SfxEat } from "./sfxEat";
import { SfxTurn } from "./sfxTurn";
const { ccclass, property } = _decorator;

@ccclass("SfxManager")
export class SfxManager extends Component {
  public static instance: SfxManager;

  @property(SfxTurn)
  public readonly sfxTurn?: SfxTurn;

  @property(SfxEat)
  public readonly sfxEat?: SfxEat;

  @property(SfxCrash)
  public readonly sfxCrash?: SfxCrash;

  // public static get Instance() {
  //   return this._instance || (this._instance = new this());
  // }
  onLoad() {
    SfxManager.instance = this;
  }

  public playAudio(key: ASSET_KEY) {
    switch (key) {
      case ASSET_KEY.TURN_SFX:
        this.sfxTurn?.play();
        break;
      case ASSET_KEY.CRASH_SFX:
        this.sfxCrash?.play();
        break;
      case ASSET_KEY.EAT_SFX:
        this.sfxEat?.play();
        break;
      default:
        break;
    }
  }
}

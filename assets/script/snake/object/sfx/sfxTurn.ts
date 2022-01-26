import { _decorator } from "cc";
import { ASSET_KEY } from "../../enum/asset";
import { BaseAudio } from "../../../lib/audio/baseAudio";
const { ccclass, property } = _decorator;

@ccclass("SfxTurn")
export class SfxTurn extends BaseAudio {
  constructor() {
    super("SfxTurn", ASSET_KEY.TURN_SFX, false, 0.6);
  }
}

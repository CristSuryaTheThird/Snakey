import { _decorator } from "cc";
import { ASSET_KEY } from "../../enum/asset";
import { BaseAudio } from "../../../lib/audio/baseAudio";
const { ccclass, property } = _decorator;

@ccclass("SfxEat")
export class SfxEat extends BaseAudio {
  constructor() {
    super("SfxEat", ASSET_KEY.EAT_SFX, false, 0.6);
  }
}

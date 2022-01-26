import { _decorator } from "cc";
import { ASSET_KEY } from "../../enum/asset";
import { BaseAudio } from "../../../lib/audio/baseAudio";
const { ccclass, property } = _decorator;

@ccclass("SfxCrash")
export class SfxCrash extends BaseAudio {
  constructor() {
    super("SfxCrash", ASSET_KEY.CRASH_SFX, false, 0.6);
  }
}

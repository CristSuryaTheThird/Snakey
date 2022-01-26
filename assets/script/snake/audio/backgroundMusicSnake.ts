import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseAudio } from "../../lib/audio/baseAudio";
const {ccclass, property} = _decorator

@ccclass('BackgroundMusicSnake')
export class BackgroundMusicSnake extends BaseAudio{
    constructor(){
        super('BackgroundMusic',ASSET_KEY.BG_MUSIC,true, 1);
    }
}
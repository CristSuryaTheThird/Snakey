import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseSprite } from "../../lib/sprite/baseSprite";
const {ccclass, property} = _decorator

@ccclass('AudioButton')
export class AudioButton extends BaseSprite{
    private readonly audioButtonOffKey = ASSET_KEY.SOUND_OFF_BUTTON_SPRITE;
    private readonly audioButtonOnKey = ASSET_KEY.SOUND_ON_BUTTON_SPRITE;

    constructor(){
        super('AudioButton', ASSET_KEY.SOUND_ON_BUTTON_SPRITE);
    }

    public setButtonSprite(toOn:boolean){
        this.setTexture(toOn ? this.audioButtonOnKey: this.audioButtonOffKey);
    }
}
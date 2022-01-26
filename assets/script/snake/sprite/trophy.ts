import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseSprite } from "../../lib/sprite/baseSprite";

const {ccclass, property} = _decorator

@ccclass('Trophy')
export class Trophy extends BaseSprite{
    constructor(){
        super('Trophy',ASSET_KEY.TROPHY_SPRITE)
    }
}
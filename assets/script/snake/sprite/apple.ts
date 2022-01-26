import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseSprite } from "../../lib/sprite/baseSprite";

const {ccclass, property} = _decorator

@ccclass('Apple')
export class Apple extends BaseSprite{
    constructor(){
        super('Apple',ASSET_KEY.APPLE_SPRITE)
    }
}
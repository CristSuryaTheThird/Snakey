import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseSprite } from "../../lib/sprite/baseSprite";

const {ccclass, property} = _decorator

@ccclass('SnakeLogo')
export class SnakeLogo extends BaseSprite{
    constructor(){
        super('SnakeLogo',ASSET_KEY.SNAKE_LOGO_SPRITE)
    }
}
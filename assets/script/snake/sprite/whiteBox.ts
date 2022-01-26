import { CCClass, _decorator } from "cc";
import { BaseSprite } from "../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../enum/asset";
const {ccclass, property} = _decorator

@ccclass('WhiteBox')
export class WhiteBox extends BaseSprite{
    constructor(){
        super('WhiteBox',ASSET_KEY.WHITE_BOX_SPRITE);
    }
}
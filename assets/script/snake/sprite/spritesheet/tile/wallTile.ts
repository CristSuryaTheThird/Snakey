
import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const {ccclass,property} = _decorator

@ccclass('WallTile')
export class WallTile extends BaseSprite{
    constructor(){
        super('WallTile',ASSET_KEY.WALL_SPRITE);
    }
}
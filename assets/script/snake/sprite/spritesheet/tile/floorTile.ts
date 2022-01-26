import { _decorator } from "cc";
import { BaseSprite } from "../../../../lib/sprite/baseSprite";
import { ASSET_KEY } from "../../../enum/asset";
const {ccclass,property} = _decorator

@ccclass('FloorTile')
export class FloorTile extends BaseSprite{
    constructor(){
        super('FloorTile',ASSET_KEY.TILE_SPRITE,0)
    }
    public adjustTileFrame(isEven:boolean){
        if(isEven){
            this.setFrame(0);
        }else{
            this.setFrame(1);
        }
        this.reload();
    }
}
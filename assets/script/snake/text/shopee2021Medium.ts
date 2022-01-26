import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseLabel } from "../../lib/text/baseLabel";
const {ccclass, property} = _decorator

@ccclass('Shopee2021Medium')
export class Shopee2021Medium extends BaseLabel{
    constructor(){
        super('Shopee2021Medium',ASSET_KEY.SHOPEE_2021_MEDIUM_FONT)
    }
}
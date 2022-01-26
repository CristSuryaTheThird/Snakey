import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseLabel } from "../../lib/text/baseLabel";
const {ccclass, property} = _decorator

@ccclass('Shopee2021Bold')
export class Shopee2021ExtraBold extends BaseLabel{
    constructor(){
        super('Shopee2021Bold',ASSET_KEY.SHOPEE_2021_BOLD_FONT)
    }
}
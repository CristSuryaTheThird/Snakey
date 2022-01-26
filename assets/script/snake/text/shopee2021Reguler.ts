import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseLabel } from "../../lib/text/baseLabel";
const {ccclass, property} = _decorator

@ccclass('Shopee2021Reguler')
export class Shopee2021Reguler extends BaseLabel{
    constructor(){
        super('Shopee2021Reguler',ASSET_KEY.SHOPEE_2021_REGULAR_FONT)
    }
}
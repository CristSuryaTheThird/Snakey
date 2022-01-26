import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseLabel } from "../../lib/text/baseLabel";
const {ccclass, property} = _decorator

@ccclass('Shopee2021ExtraBold')
export class Shopee2021ExtraBold extends BaseLabel{
    constructor(){
        super('Shopee2021ExtraBold',ASSET_KEY.SHOPEE_2021_EXTRA_BOLD_FONT)
    }
}
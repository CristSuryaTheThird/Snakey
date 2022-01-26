import { _decorator } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseLabel } from "../../lib/text/baseLabel";
const {ccclass, property} = _decorator

@ccclass('Shopee2021SemiBold')
export class Shopee2021SemiBold extends BaseLabel{
    constructor(){
        super('Shopee2021SemiBold',ASSET_KEY.SHOPEE_2021_SEMI_BOLD_FONT)
    }
}
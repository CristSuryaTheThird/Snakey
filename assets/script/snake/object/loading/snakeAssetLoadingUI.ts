import { _decorator, Component } from "cc";
import { BaseLabel } from "../../../lib/text/baseLabel";
import { SnakeLoadingBar } from "./snakeLoadingBar";
const {ccclass,property} = _decorator

@ccclass('SnakeAssetLoadingUI')
export class SnakeAssetLoadingUI extends Component{
    @property(BaseLabel)
    public percentLoadText?:BaseLabel;

    @property(SnakeLoadingBar)
    public loadingBar?: SnakeLoadingBar;

    public updateText(progress:number, key?:string){
        const {percentLoadText} = this;
        const progressPercent = Math.floor(progress * 100);
        this.loadingBar?.drawInnerBar(progress);
        
        if(percentLoadText){
            percentLoadText.setText(`${progressPercent}%`);
        }
    }
}

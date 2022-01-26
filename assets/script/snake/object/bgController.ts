import {_decorator, Graphics, Component, UITransform} from "cc";
const {ccclass} = _decorator

@ccclass('BgController')
export class BgController extends Component{

    private bg?: Graphics | null
    private uiTransform?: UITransform | null;
    onLoad(){
        this.uiTransform = this.getComponent(UITransform);
        this.bg = this.getComponent(Graphics)
        this.drawBG();
    }

    private drawBG(){
        const{bg} = this;
        const config = this.getBgConfig();

        if(!bg || !config) return;
        const{x,y,width,height} = config;
        bg.fillRect(x,y,width,height);
    }

    private getBgConfig(){
        const {uiTransform} = this;

        if(!uiTransform) return undefined;

        const {width,height} = uiTransform;

        return{
            x: width * -0.5,
            y: height * -0.5,
            width: width,
            height: height,
        }
    }
}
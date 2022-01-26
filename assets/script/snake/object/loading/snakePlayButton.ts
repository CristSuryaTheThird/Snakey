import { _decorator, Component, Graphics, UITransform, Label } from "cc";
import { BaseLabel } from "../../../lib/text/baseLabel";
const {ccclass, property} = _decorator;

@ccclass('SnakePlayButton')
export class SnakePlayButton extends Component{
    @property(Graphics)
    public readonly buttonBg?: Graphics;

    @property(BaseLabel)
    public readonly buttonLabel?: BaseLabel;

    private uiTransform?: UITransform | null

    onLoad(){
        this.uiTransform = this.getComponent(UITransform);
        this.buttonLabel?.setText('');
    }

    public createButton(){
        this.drawButtonBg();
        this.buttonLabel?.setText('PLAY');
    }

    private drawButtonBg(){
        const {buttonBg} = this;
        const config = this.getButtonBgConfig();

        if(!buttonBg || !config) return;

        const {x,y,width,height} = config;
        buttonBg.fillRect(x,y,width,height);

    }

    private getButtonBgConfig(){
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
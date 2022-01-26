import {_decorator, Component, Graphics, UITransform} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('SnakeLoadingBar')
export class SnakeLoadingBar extends Component{
    @property(Graphics)
    public readonly outerBar?: Graphics

    @property(Graphics)
    public readonly baseBar?: Graphics

    @property(Graphics)
    public readonly innerBar?: Graphics

    private uiTransform?: UITransform | null;
    
    onLoad(){
        this.uiTransform = this.getComponent(UITransform)

        this.draw();
    }

    private draw(){
        this.drawOuterBar();
        this.drawBaseBar();
    }

    private drawOuterBar(){
        const {outerBar} = this;
        const config = this.getOuterBarConfig();

        if(!outerBar || !config)return;
        const {x, y, width, height, r} = config;
        outerBar.roundRect(x,y,width,height, r);
        outerBar.fill();
    }

    private getOuterBarConfig(){
        
        const {uiTransform} = this;

        if(!uiTransform) return undefined;

        const {width,height} = uiTransform;
        
        return{
            x: width * -0.5,
            y: height * -0.5,
            width,
            height,
            r: Math.min(width, height) * 0.5,
        };
    }

    private drawBaseBar(){
        const {baseBar} = this;
        const config = this.getBaseBarConfig();

        if(!baseBar || !config)return;
        const {x, y, width, height, r} = config;
   
        baseBar.roundRect(x, y, width, height, r);
        baseBar.fill();
    }

    private getBaseBarConfig(){
        const {uiTransform} = this;

        if(!uiTransform) return undefined

        const {width, height} = uiTransform;
        const innerWidth = width - 12.5;
        const innerHeight = height - 12.5;
    

        return {
            x:innerWidth * -0.5,
            y:innerHeight * -0.5,
            width: innerWidth,
            height: innerHeight,
            r: Math.min(innerWidth, innerHeight) * 0.5,
        }
    }

    public drawInnerBar(progress: number){
        const {innerBar} = this;
        const config = this.getInnerBarConfig(progress)

        if(!innerBar || !config) return;

        const {x, y, width, height, r} = config;

        innerBar.clear();
        innerBar.roundRect(x,y,width,height, r);
        innerBar.fill();
    }

    private getInnerBarConfig(progress:number){
        const {uiTransform} = this;

        if(!uiTransform) return undefined;

        const {width, height} = uiTransform;
        const fullWidth = width - 12.5;
        const innerWidth = fullWidth * (progress);
        const innerHeight = height - 12.5;
       
        return{
            x: fullWidth * -0.5,
            y: innerHeight * -0.5,
            width: innerWidth,
            height: innerHeight,
            r: Math.min(innerWidth,innerHeight) * 0.5,
        }
    }



}
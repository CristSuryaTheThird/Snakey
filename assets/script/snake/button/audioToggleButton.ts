import {_decorator, Node, Button} from 'cc';
import { getSoundStateFromLocalStorage, updateLocalStorageSoundState } from '../../lib/util/localStorage';
import { AudioButton } from '../sprite/audioButton';
const {ccclass, property} = _decorator;

@ccclass('AudioToggleButton')
export class AudioToggleButton extends Button{
    @property(AudioButton)
    public readonly audioButtonSprite?: AudioButton;

    start(){
        this.syncButtonSprite();

        this.node.on(Node.EventType.TOUCH_END, () =>{
            this.toggleSoundState();
        },this);
    }

    private syncButtonSprite(){
        const isSoundStateOn = getSoundStateFromLocalStorage();
        this.audioButtonSprite?.setButtonSprite(isSoundStateOn);
    }

    private toggleSoundState(shouldOn?: boolean){
        const currentSoundState = getSoundStateFromLocalStorage();
        updateLocalStorageSoundState(shouldOn || !currentSoundState);
        this.syncButtonSprite();
    }
}
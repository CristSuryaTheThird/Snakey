import { _decorator, Component, Node, AudioSource, AudioClip, assetManager, game } from 'cc';
import { BASE_AUDIO_EVENT } from '../enum/audio';
import { GAME_EVENT } from '../enum/game';
import { getSoundStateFromLocalStorage } from '../util/localStorage';
const { ccclass, property } = _decorator;

@ccclass('BaseAudio')
export class BaseAudio extends Component {
    private audioSource?: AudioSource | null;

    private audioClip: AudioClip | null = null;

    constructor(
        name: string, 
        protected readonly audioKey: string,
        protected loop = false,
        protected volume = 1,
    ) {
        super(name);
    }

    onLoad() {
        game.on(GAME_EVENT.SOUND_STATE_CHANGE, this.onSoundStateChange, this);

        this.node.once(Node.EventType.NODE_DESTROYED, () => {
            game.off(GAME_EVENT.SOUND_STATE_CHANGE, this.onSoundStateChange, this);
        });
        this.reload(this.volume);
    }

    /**
     * Play the clip. Resume if paused.
     * @param vol Set new volume for audio source.
     */
    public play(vol?: number): void {
        this.reload();
        if (this.audioSource) {
            if (vol) this.setVolume(vol);
            this.audioSource.play();
            this.node.emit(BASE_AUDIO_EVENT.PLAY, this.audioKey);
        }
    }

    /**
     * Pause the clip.
     */
    public pause(): void {
        this.reload();
        if (this.audioSource) {
            this.audioSource.pause();
            this.node.emit(BASE_AUDIO_EVENT.PAUSE, this.audioKey);
        }
    }

    /**
     * Stop the clip.
     */
    public stop(): void {
        this.reload();
        if (this.audioSource) {
            this.audioSource.stop();
            this.node.emit(BASE_AUDIO_EVENT.STOP, this.audioKey);
        }
    }

    /**
     * Stop and play the clip.
     * @param vol Set new volume for audio source.
     */
    public replay(vol?: number): void {
        this.stop();
        this.play(vol);
    }

    public reload(vol?: number) {
        if (!this.audioSource) {
            this.audioSource = this.getComponent(AudioSource);
           
        }
        if(!this.audioClip){
            this.audioClip = this.getAudioClip();
            this.setupAudio(vol);
        }
    }

    private onSoundStateChange() {
        this.setVolume(this.volume);
    }

    private isMuted() {
        return !getSoundStateFromLocalStorage();
    }

    private setVolume(volume: number) {
        const { audioSource } = this;

        if (!audioSource) return;

        if (this.isMuted()) {
            audioSource.volume = 0;
        } else {
            audioSource.volume = volume;
        }

        this.volume = volume;
    }

    private getAudioClip() {
        return assetManager.assets.get(this.audioKey) as AudioClip;
    }

    private setupAudio(vol?: number) {
        const { audioSource, audioClip, loop, volume } = this;

        if (!audioSource || !audioClip) return;

        audioSource.clip = audioClip;
        audioSource.loop = loop;
        this.setVolume(vol ?? volume);
    }
}

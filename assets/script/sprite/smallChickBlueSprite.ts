import { _decorator, Component, Node, assetManager, AnimationClip } from 'cc';
import { ANIMATION_KEY } from '../enum/animation';
import { ASSET_KEY } from '../enum/asset';
import { generateAnimationClip } from '../lib/util/animation';
import { BaseSprite } from '../lib/sprite/baseSprite';
const { ccclass, property } = _decorator;

@ccclass('SmallChickBlueSprite')
export class SmallChickBlueSprite extends BaseSprite {
	private readonly smallChickBlueAnimationKey = ANIMATION_KEY.SMALL_CHICK_BLUE;

	constructor() {
		super('SmallChickBlueSprite', ASSET_KEY.SMALL_CHICK_BLUE_SPRITE, 0);
	}

	onLoad() {
		super.onLoad();
		this.setupAnimation();
		
	}
	
	start() {
		this.playSmallChickBlueAnimation();
	}

	private setupAnimation() {
		const { smallChickBlueAnimationKey } = this;

		const smallChickBlueAnimationClip = this.getSmallChickBlueAnimationClip();

		if (smallChickBlueAnimationClip) {
			this.animation?.createState(smallChickBlueAnimationClip, smallChickBlueAnimationKey);			
		}
	}

	private getSmallChickBlueAnimationClip() {
		const { smallChickBlueAnimationKey } = this;

		const animationAsset = assetManager.assets.get(smallChickBlueAnimationKey);

		if (animationAsset) return animationAsset as AnimationClip;
	
		const animationClip = this.generateSmallChickBlueAnimationClip();

		if (animationClip) {
			assetManager.assets.add(smallChickBlueAnimationKey, animationClip);
		}

		return animationClip;
	}

	public generateSmallChickBlueAnimationClip() {
		const { textureKey } = this;

		const animationClip = generateAnimationClip(
			assetManager, 
			textureKey, 
			[0, 1, 2, 3, 4, 5, 6, 7], 
			16,
			AnimationClip.WrapMode.Loop
		);
		
		return animationClip;
	}

	public playSmallChickBlueAnimation() {
		this.animation?.play(this.smallChickBlueAnimationKey);
	}
}

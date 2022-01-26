import { _decorator, Component, director, game, Node } from "cc";
import { ASSET_LOADER_EVENT } from "../../lib/enum/assetLoader";
import { AssetLoader } from "../../lib/loader/assetLoader";
import { SnakeAssetLoadingUI } from "../object/loading/snakeAssetLoadingUI";
import ShopeeWebBridge from "../../lib/webBridge/shopeeWebBridge";
import { getAssets } from "../config/asset";
import { SCENE_KEY } from "../enum/scene";
import { BaseSprite } from "../../lib/sprite/baseSprite";
import { BackgroundMusicSnake } from "../audio/backgroundMusicSnake";
import { TransitionScreen } from "../object/transitionScreen";
import { TRANSITION_KEY } from "../enum/transition";
const { ccclass, property } = _decorator;

@ccclass("PreloadSceneSnake")
export class PreloadSceneSnake extends Component {
  @property(AssetLoader)
  public readonly assetLoader?: AssetLoader;

  @property(SnakeAssetLoadingUI)
  public readonly assetLoadingUI?: SnakeAssetLoadingUI;

  @property(BackgroundMusicSnake)
  public readonly backgroundMusic?: BackgroundMusicSnake;

  @property(TransitionScreen)
  public readonly transitionScreen?: TransitionScreen;

  private baseSprite = new Array<BaseSprite>();

  onLoad() {
    this.setupWebBridge();
    this.baseSprite = this.node.scene.getComponentsInChildren(BaseSprite);
  }

  private setupWebBridge() {
    const isWebBridgeReady = ShopeeWebBridge.init();
    if (!isWebBridgeReady) return;

    ShopeeWebBridge.configurePage({
      showNavbar: true,
      title: "Shopee Snake",
    });
  }

  start() {
    this.startAssetsLoad();
    this.transitionScreen?.node.once(TRANSITION_KEY.FADE_IN_COMPLETE, () => {
      this.handleBackgroundMusic();
      director.loadScene(SCENE_KEY.LANDING);
    });
  }

  private startAssetsLoad() {
    const { assetLoader } = this;

    assetLoader?.node.on(
      ASSET_LOADER_EVENT.START,
      this.onAssetLoaderStart,
      this
    );
    assetLoader?.node.on(
      ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS,
      this.onAssetLoaderSuccess,
      this
    );
    assetLoader?.node.on(
      ASSET_LOADER_EVENT.COMPLETE,
      this.onAssetLoaderComplete,
      this
    );

    assetLoader?.startAssetsLoad(getAssets());
  }

  private onAssetLoaderStart(progress: number) {
    this.assetLoadingUI?.updateText(progress);
  }

  private onAssetLoaderSuccess(progress: number, key: string) {
    this.assetLoadingUI?.updateText(progress, key);
    this.baseSprite?.forEach((sprite) => {
      sprite.reload();
    });
  }

  private onAssetLoaderComplete(progress: number) {
    this.assetLoadingUI?.updateText(progress);
    this.onComplete();
  }

  private onComplete() {
    // this.handleBackgroundMusic();
    this.transitionScreen?.fadeIn(0.75);
    // director.loadScene(SCENE_KEY.LANDING);
  }

  private handleBackgroundMusic() {
    const { backgroundMusic } = this;
    if (!backgroundMusic) return;

    backgroundMusic.play();

    game.addPersistRootNode(backgroundMusic.node);
  }
}

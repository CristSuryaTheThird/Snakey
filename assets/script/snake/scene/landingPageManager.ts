import { _decorator, Component, director } from "cc";
import { SCENE_KEY } from "../enum/scene";
import { BUTTON_EVENT } from "../enum/button";
import { TRANSITION_KEY } from "../enum/transition";
import { TransitionScreen } from "../object/transitionScreen";
import { PlayButton } from "../button/playButton";
import { BaseLabel } from "../../lib/text/baseLabel";
import { LOCAL_STORAGE_KEY } from "../../lib/enum/localStorage";
import { getValueFromLocalStorage } from "../../lib/util/localStorage";
const { ccclass, property } = _decorator;

@ccclass("LandingPageManager")
export class LandingPageManager extends Component {
  @property(TransitionScreen)
  public readonly transitionScreen?: TransitionScreen;

  @property(PlayButton)
  public readonly playButton?: PlayButton;

  @property(BaseLabel)
  public readonly higscoreLabel?: BaseLabel;

  private highScore = 0;

  start() {
    this.highScore =
      getValueFromLocalStorage(LOCAL_STORAGE_KEY.HIGHSCORE_DATA) || 0;
    this.higscoreLabel?.setText(this.highScore.toString());
    this.transitionScreen?.fadeOut(0.75);
    this.transitionScreen?.node.once(
      TRANSITION_KEY.FADE_OUT_COMPLETE,
      () => {
        this.playButton?.node.once(
          BUTTON_EVENT.PLAY_BUTTON_CLICK.toString(),
          () => {
            this.transitionScreen?.fadeIn(0.75);
          },
          this
        );
      },
      this
    );

    this.transitionScreen?.node.once(TRANSITION_KEY.FADE_IN_COMPLETE, () => {
      director.loadScene(SCENE_KEY.GAME);
    });
  }
}

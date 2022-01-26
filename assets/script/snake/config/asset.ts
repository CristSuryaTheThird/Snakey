import { ASSET_TYPE } from "../../lib/enum/asset";
import { AssetConfig } from "../../lib/interface/asset";
import { ASSET_KEY } from "../enum/asset";

export function getAssets() {
  const assets = new Array<AssetConfig>();

  //Sprite
  assets.push({
    key: ASSET_KEY.SNAKE_LOGO_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/logo_shopee_ular",
  });
  assets.push({
    key: ASSET_KEY.WHITE_BOX_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/white_box",
  });

  assets.push({
    key: ASSET_KEY.APPLE_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/sprite_apple",
  });
  assets.push({
    key: ASSET_KEY.SOUND_ON_BUTTON_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/sprite_sound_on",
  });
  assets.push({
    key: ASSET_KEY.SOUND_OFF_BUTTON_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/sprite_sound_off",
  });

  assets.push({
    key: ASSET_KEY.WALL_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/sprite_wall",
  });
  assets.push({
    key: ASSET_KEY.TROPHY_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "snake/image/sprite_trophy",
  });
  assets.push({
    key: ASSET_KEY.TILE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "snake/image/sprite_tile",
    config: {
      frameWidth: 48,
      frameHeight: 48,
      paddingX: 0,
      paddingY: 0,
    },
  });
  assets.push({
    key: ASSET_KEY.SNAKE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "snake/image/spritesheet_snake",
    config: {
      frameWidth: 96,
      frameHeight: 96,
      paddingX: 0.7,
      paddingY: 0,
    },
  });
  assets.push({
    key: ASSET_KEY.ROUND_SNAKE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "snake/image/spritesheet_round",
    config: {
      frameWidth: 96,
      frameHeight: 96,
      paddingX: 1,
      paddingY: 0,
    },
  });
  assets.push({
    key: ASSET_KEY.KEYPAD_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "snake/image/keypad",
    config: {
      frameWidth: 124,
      frameHeight: 124,
      paddingX: 20,
      paddingY: 16,
    },
  });

  //Font
  assets.push({
    key: ASSET_KEY.SHOPEE_2021_MEDIUM_FONT,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "snake/font/Shopee2021/Shopee2021-Medium",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_2021_REGULAR_FONT,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "snake/font/Shopee2021/Shopee2021-Regular",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_2021_SEMI_BOLD_FONT,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "snake/font/Shopee2021/Shopee2021-SemiBold",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_2021_BOLD_FONT,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "snake/font/Shopee2021/Shopee2021-Bold",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_2021_EXTRA_BOLD_FONT,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "snake/font/Shopee2021/Shopee2021-ExtraBold",
  });

  //Music
  assets.push({
    key: ASSET_KEY.BG_MUSIC,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "snake/audio/bg-music",
  });

  assets.push({
    key: ASSET_KEY.TURN_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "snake/audio/turn",
  });

  assets.push({
    key: ASSET_KEY.EAT_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "snake/audio/eat",
  });

  assets.push({
    key: ASSET_KEY.CRASH_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "snake/audio/crash",
  });

  return assets;
}

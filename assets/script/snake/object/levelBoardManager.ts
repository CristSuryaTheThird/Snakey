import { Component, instantiate, Node, Prefab, Vec2, _decorator } from "cc";
import { TILE_TYPE } from "../enum/tile";
import { TileConfig } from "../interfaces/gameplayInterface";
import { FloorTile } from "../sprite/spritesheet/tile/floorTile";
import { WallTile } from "../sprite/spritesheet/tile/wallTile";
const { ccclass, property } = _decorator;

@ccclass("LevelBoardManager")
export class LevelBoardManager extends Component {
  @property(Prefab)
  private readonly floorTile?: Prefab;

  @property(Prefab)
  private readonly wallTile?: Prefab;

  @property(Node)
  private readonly tileRoot?: Node;

  private readonly TILE_SIZE = 28;
  private levelBoard = new Array<Array<TileConfig>>();

  public generateLevelBoard(levelConfig: Array<Array<number>>) {
    this.levelBoard = this.getLevelBoardFromConfig(levelConfig);
    this.generateTile();
  }

  private getLevelBoardFromConfig(levelConfig: Array<Array<number>>) {
    return levelConfig.map((row, rowIdx) => {
      return row.map((tileType, colIdx) => {
        return {
          type: tileType,
          pos: new Vec2(colIdx, rowIdx),
        } as TileConfig;
      });
    });
  }

  private generateTile() {
    this.levelBoard.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        const tilePrefab = this.getTilePrefab(tile);
        if (tilePrefab) {
          const { x, y } = this.getTilePos(colIdx, rowIdx);
          const myTile = instantiate(tilePrefab);
          myTile.setParent(this.tileRoot || this.node);
          myTile.setPosition(x, y);
          myTile.active = true;

          if (tile.type === TILE_TYPE.FLOOR) {
            myTile
              .getComponent(FloorTile)
              ?.adjustTileFrame((colIdx + rowIdx) % 2 === 0);
          }
          this.assignNodeToTileConfig(colIdx, rowIdx, myTile);
        }
      });
    });
  }

  private getTilePrefab(tile: TileConfig) {
    if (tile.type === TILE_TYPE.FLOOR) {
      return this.floorTile;
    } else {
      return this.wallTile;
    }
  }

  private assignNodeToTileConfig(colIdx: number, rowIdx: number, node: Node) {
    const tile = this.getTile(colIdx, rowIdx);
    if (tile) {
      tile.node = node;
    }
  }

  private getTile(coldIdx: number, rowIdx: number) {
    const row = this.levelBoard[rowIdx];
    if (row) {
      return row[coldIdx];
    } else {
      return undefined;
    }
  }

  public getTilePos(x: number, y: number) {
    return {
      x: x * this.TILE_SIZE,
      y: -y * this.TILE_SIZE,
    };
  }
}

import Phaser from "phaser";
import { ScrollContainer } from "../Controls/ScrollContainer";

export const ScrollContainerDemoScene_Constants={
  ScenKey:'ScrollContainerDemoScene'
}
export class ScrollContainerDemoScene extends Phaser.Scene {
  constructor() {
    super({ key:ScrollContainerDemoScene_Constants.ScenKey  });
  }

  create(): void {
     const container:ScrollContainer = new ScrollContainer(this,
      new Phaser.Geom.Rectangle(0,0,200,200));
  }
}

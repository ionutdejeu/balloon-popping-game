import Phaser from "phaser";
import { ScrollContainer } from "../Controls/ScrollContainer";
import { Atlases } from "../Data";

export const ScrollContainerDemoScene_Constants={
  ScenKey:'ScrollContainerDemoScene'
}
export class ScrollContainerDemoScene extends Phaser.Scene {
  constructor() {
    super({ key:ScrollContainerDemoScene_Constants.ScenKey  });
  }
  
  preload():void{
    this.load.setPath('assets/images');
    this.load.image('bubble',Atlases.BubbleSprite);
    this.load.image('bubbleExplosionParticle', 'blue.png');
  }
  create(): void {
     const container:ScrollContainer = new ScrollContainer(this,
     new Phaser.Geom.Rectangle(0,0,200,200));
  }

}

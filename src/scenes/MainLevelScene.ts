import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases,Sounds} from '../Data';
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import { LevelMangerEvents, LevelManager, StandardLevelManager } from "../Managers/LevelManager";
import { InGameMenuManager } from "../Managers/InGameMenuManager";

export const MainLevel_Constants={
  ScenKey:'MainLevel'
}
export class MainLevelScene extends Phaser.Scene {
  
  levelManager:LevelManager;
  inGameMenuManager:InGameMenuManager;
  
  constructor() {
    super({ key: MainLevel_Constants.ScenKey });
  }
  preload():void{
    this.load.setPath('assets/images');
    this.load.image('bubble',Atlases.BubbleSprite);
    this.load.image('bubbleExplosionParticle', 'blue.png');
    this.load.image('cloud1',Atlases.Clouds1);
    this.load.image('cloud2',Atlases.Clouds2);
    this.load.image('cloud3',Atlases.Clouds3);
    this.cameras.main.setBackgroundColor(0x96DDFF); 

    this.load.setPath('assets/audio');
    this.load.audio('BaloonPop',Sounds.BaloonPop);
    this.load.audio('BackgroundMusic',Sounds.BackgroundMusic);
    InGameMenuManager.preload(this);
  }
  create(): void {
    this.levelManager = new StandardLevelManager(this);
    
    const clouds = [];
    clouds.push(this.add.sprite(
      this.cameras.main.centerX+100,
      this.cameras.main.centerY+100,
      'cloud1'));
    clouds.push(this.add.sprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'cloud2'));
    clouds.push(this.add.sprite(
      this.cameras.main.centerX-100,
      this.cameras.main.centerY-200,
      'cloud3'));

    const tweens = [];
    clouds.forEach(cloud => {
      (<Phaser.GameObjects.Sprite>cloud)
      .setDepth(-999)
      .setAlpha(0.5);

      tweens.push(this.tweens.add({
        targets: cloud,
        angle: Phaser.Math.Between(-5,5),
        duration: Phaser.Math.Between(2000,4000),
        ease: 'Sine.easeOut',
        yoyo: true,
        repeat: -1
      }));
    });
    
    
    
    
    
  }
  

   
}
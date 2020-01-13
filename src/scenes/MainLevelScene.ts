import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases,Sounds} from '../Data';
import {BubbleManager, BUBBLE_EVENTS_CONSTANTS} from "../Prefabs/BubbleManager";
import { InGameMenuConstant, InGameMenuScene } from "./InGameMenuScene";
import { BubbleContainer } from "../Prefabs/BubbleContainer";

export const MainLevel_Constants={
  ScenKey:'MainLevel'
}
export class MainLevelScene extends Phaser.Scene {
  
  bubbleManager:BubbleManager;
  inGameMenuScene:InGameMenuScene;
  
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
  }
  create(): void {
    //this.physics.world.setBoundsCollision(false,false,true,false);
    this.bubbleManager = new BubbleManager(this);
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
    
    // var music = this.sound.add('BackgroundMusic');
    // music.play();
    this.scene.launch(InGameMenuConstant.SceneKey);
    this.inGameMenuScene = this.scene.get(InGameMenuConstant.SceneKey) as InGameMenuScene;
    this.events.on(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,(prefab:BubbleContainer)=>{
        this.inGameMenuScene.scoreChangedEventHandler(prefab);
    });
  }
  

   
}
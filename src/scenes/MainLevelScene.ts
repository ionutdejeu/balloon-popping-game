import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases,Sounds} from '../Data';
import {BubbleManager} from "../Prefabs/BubbleManager";

export const MainLevel_Constants={
  ScenKey:'MainLevel'
}
export class MainLevelScene extends Phaser.Scene {
  
  bubbleManager:BubbleManager;
  
  constructor() {
    super({ key: MainLevel_Constants.ScenKey });
    this.bubbleManager = new BubbleManager(this);

  }
  preload():void{
    this.load.setPath('assets/images');
    this.load.image('bubble',Atlases.BubbleSprite);
    this.load.image('bubbleExplosionParticle', 'blue.png');
    this.cameras.main.setBackgroundColor(0x96DDFF); 

    this.load.setPath('assets/audio');
    this.load.audio('BaloonPop',Sounds.BaloonPop);
    this.load.audio('BackgroundMusic',Sounds.BackgroundMusic);
  }
  create(): void {
    //this.physics.world.setBoundsCollision(false,false,true,false);
    this.bubbleManager.SoundSetup();
    this.bubbleManager.SetupUI();
    var music = this.sound.add('BackgroundMusic');
    music.play();
  }

   
}
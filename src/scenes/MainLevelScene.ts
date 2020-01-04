import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases,Sounds} from '../Data';
import BubbleManager from "../Prefabs/BubbleManager";

export default class MainMenu extends Phaser.Scene {
  
  bubbleManager:BubbleManager;
  constructor() {
    super({ key: "ManinLevel" });
    this.bubbleManager = new BubbleManager(this);

  }
  preload():void{
    this.load.setPath('assets/images');
    this.load.image('bubble',Atlases.BubbleSprite);
    this.SetupBackgroundGraphics();

    this.load.setPath('assets/audio');
    this.load.audio('BaloonPop',Sounds.BaloonPop);
    this.load.audio('BackgroundMusic',Sounds.BackgroundMusic);
  }
  create(): void {
    this.bubbleManager.SoundSetup();
    this.bubbleManager.SetupUI();
    this.bubbleManager.spawnRandomBubbles(10);
    var music = this.sound.add('BackgroundMusic');
    music.play();
  }

  private SetupBackgroundGraphics(){
    this.cameras.main.setBackgroundColor(0x96DDFF); 
  }
}
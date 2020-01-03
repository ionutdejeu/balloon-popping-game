import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases} from '../Data';

export default class MainMenu extends Phaser.Scene {
  buttonPannel:ButtonPannel;
  
  constructor() {
    super({ key: "MainMenu" });
  
    this.buttonPannel= new ButtonPannel(this,200,100);
  }

  preload():void { 
    this.load.image('cloud1','assets/images/'+Atlases.Clouds1);
    this.load.image('cloud2','assets/images/'+Atlases.Clouds2);
    this.load.image('cloud3','assets/images/'+Atlases.Clouds3);
    this.load.audio('backgroundMusic','assets/audio/background_music_menu.mp3');
  }
  create(): void {
    this.cameras.main.setBackgroundColor(0x96DDFF); 
    this.buttonPannel.addTextButton("Play Game");
    this.buttonPannel.addTextButton("Options");
    this.buttonPannel.addTextButton("Unlocks");
    this.buttonPannel.addTextButton("Quit");

    this.add.sprite(100,100,'cloud1');
    this.add.sprite(150,400,'cloud2');
    this.add.sprite(300,600,'cloud2');

    var music = this.sound.add('backgroundMusic');
    music.play();
  }
}

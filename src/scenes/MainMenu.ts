import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases} from '../Data';
import { MainMenuManager } from "../Managers/MainMenuManager";

export const MainMenu_Constants={
  ScenKey:'MainMenu'
}
export class MainMenu extends Phaser.Scene {
  
  maninMenuManager:MainMenuManager;
  constructor() {
    super({ key: MainMenu_Constants.ScenKey });
  
    
  }

  preload():void { 
    this.load.setPath('assets/images');
    this.load.image('cloud1',Atlases.Clouds1);
    this.load.image('cloud2',Atlases.Clouds2);
    this.load.image('cloud3',Atlases.Clouds3);

    this.load.setPath('assets/audio');
    this.load.audio('backgroundMusic','background_music_menu.mp3');
  }
  create(): void {
    this.cameras.main.setBackgroundColor(0x96DDFF); 
    
    this.add.sprite(100,100,'cloud1');
    this.add.sprite(150,400,'cloud2');
    this.add.sprite(300,600,'cloud2');

    
    this.maninMenuManager = new MainMenuManager(this);
  }
}

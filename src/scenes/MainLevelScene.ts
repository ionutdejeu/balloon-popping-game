import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import {Atlases} from '../Data';

export default class MainMenu extends Phaser.Scene {
  buttonPannel:ButtonPannel;
  
  constructor() {
    super({ key: "MainMenu" });
  
    this.buttonPannel= new ButtonPannel(this,200,100);
  }

}
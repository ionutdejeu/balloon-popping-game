import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import { MainLevel_Constants } from "../Scenes/MainLevelScene";

export const MAIN_MENU_EVENTS = {
    MAIN_MENU_STARTGAME:'MAIN MENU START GAME OPTION',
    MAIN_MENU_QUIT:'MAIN MENU QUIT ITEM OPTION',

}

export class MainMenuManager{
    buttonPannel:ButtonPannel;
    music:Phaser.Sound.BaseSound;
    constructor(
        public scene:Phaser.Scene,
        )
    {
        this.scene.events.on(MAIN_MENU_EVENTS.MAIN_MENU_QUIT,this.quitApplication,this);
        //this.scene.events.on(MAIN_MENU_EVENTS.MAIN_MENU_STARTGAME,this.playGameButtonCallback,this);
        this.buttonPannel= new ButtonPannel(this.scene,this.scene.cameras.main.centerX,100);
        this.buttonPannel.addTextButton("Play Game",()=>{this.playGameButtonCallback()});
        this.buttonPannel.addTextButton("Sound",()=>{});
        this.buttonPannel.addTextButton("Quit",this.quitButtonCallback);
        this.music = this.scene.sound.add('backgroundMusic');
        this.music.play();
    }

    playGameButtonCallback(){
        console.log("pressed Play game button",this);
        this.music.stop();
        this.scene.scene.stop();
        this.scene.scene.start(MainLevel_Constants.ScenKey);
    }
    optionsButtonCallback(){
        console.log("optionsButtonCallback  button",this);
    }
    quitButtonCallback(){
        console.log("quitButtonCallback button",this);
        if (window.navigator['app']) {
            window.navigator['app'].exitApp();
        } else if (window.navigator['device']) {
            window.navigator['device'].exitApp();
        } else {
            window.close();
        }
    }
    
    quitApplication(){
        
    }
    

}
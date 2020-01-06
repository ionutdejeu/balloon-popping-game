import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";

export const MAIN_MENU_EVENTS = {
    MAIN_MENU_STARTGAME:'MAIN MENU START GAME OPTION',
    MAIN_MENU_QUIT:'MAIN MENU QUIT ITEM OPTION',

}

export class MainMenuManager{
    buttonPannel:ButtonPannel;
    constructor(
        public scene:Phaser.Scene,
        )
    {
        this.scene.events.on(MAIN_MENU_EVENTS.MAIN_MENU_QUIT,this.quitApplication,this);
        this.buttonPannel= new ButtonPannel(this.scene,200,100);
        this.buttonPannel.addTextButton("Play Game",this.playGameButtonCallback);
        this.buttonPannel.addTextButton("Options",this.optionsButtonCallback);
        this.buttonPannel.addTextButton("Unlocks",()=>{});
        this.buttonPannel.addTextButton("Quit",this.quitButtonCallback);

    }

    playGameButtonCallback(){
        console.log("pressed Play game button",this);
    }
    optionsButtonCallback(){
        console.log("optionsButtonCallback  button",this);
    }
    quitButtonCallback(){
        console.log("quitButtonCallback  button",this);
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
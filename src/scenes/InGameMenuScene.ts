import Phaser from "phaser";
import { ProgressBar } from "../Controls/ProgressBar";


export const InGameMenuEvents = {
    LEVEL_TIME_EXPIRED:'MAIN MENU START GAME OPTION',
    TAP_PAUSEMENU:'IN GAME MENU TAP ON Pause Button',
}
export const InGameMenuConstant= {
    SceneKey:'InGameMenu'
}

export class InGameMenuScene extends Phaser.Scene {
    
    levelTimeProgressBar:ProgressBar;
    public levelTimer:Phaser.Time.TimerEvent;
    
    
    constructor(){
        super({key:InGameMenuConstant.SceneKey});
        
    }

    preload():void {
        
    }
    create(): void {
        this.levelTimeProgressBar = new ProgressBar(this,0,0);
        this.levelTimer = this.time.addEvent({ delay: 1000, 
            callback: this.updateTimer, 
            callbackScope: this, 
            loop: true });
    }
    updateTimer(){
        if(this.levelTimeProgressBar.decrease(1)){
            // trigger the event for this scene
            
        }
    }

}
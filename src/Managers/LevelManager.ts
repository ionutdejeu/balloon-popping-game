import Phaser from "phaser";
import { BubbleContainer } from "../Prefabs/BubbleContainer";

export const LevelMangerEvents = {
    LevelEnded:'Level Manage Level ended event',
    LevelStared:'Level Manager Level Started event',
    LevelObjectDistroyed:'Level Object Destroyed', 
    LevelObjectOutofBounds:'Level Object has levet the level bounds',
    PlayerTap:'Player tapped on the screen',
    LevelStateUpdate:'Level state has changed'
}

export interface LevelManager{
    checkWinCondition()
    checkLooseCondition()
    endHandler()
    beginHandler()
    updateLevelState()
}

export class StandardLevelManager implements LevelManager{
    public timeAvailableInSec = 60;

    constructor(public scene:Phaser.Scene){
        this.scene.events.on(LevelMangerEvents.LevelStateUpdate,this.updateLevelState,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectDistroyed,this.ObjectDestroyed,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectDistroyed,this.ObjectOutOfBounds,this);
    }
    checkLooseCondition() {
        
    }
    public ObjectDestroyed(bubble:BubbleContainer){
        
    }   
    public ObjectOutOfBounds(bubble:BubbleContainer){

    }
    public updateLevelState() {
        
    }
    
    public checkWinCondition() {
        
    }   
    public endHandler() {
        
    }
    public beginHandler() {
        
    }


}
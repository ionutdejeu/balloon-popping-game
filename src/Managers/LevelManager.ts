import Phaser from "phaser";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import { ScoreManager } from "../Prefabs/ScoreManagerPrefab";
import { SpawnBubblesManager } from "../Prefabs/SpawnBubblesManager";

export const LevelMangerEvents = {
    LevelEnded:'Level Manage Level ended event',
    LevelGameOver:'Level Manager - GameOver',
    LevelStared:'Level Manager Level Started event',
    LevelObjectDistroyed:'Level Object Destroyed', 
    LevelObjectOutofBounds:'Level Object has levet the level bounds',
    BubbleObjectTap:'Player tapped on the bubble object',
    LevelStateUpdate:'Level state has changed',
    LevelTimeExpired:'MAIN MENU START GAME OPTION',
    MenuButtonPressed:'IN GAME MENU TAP ON Pause Button',
    MenuOptionsMusicButtonePressed:'IN GAME MENU TAP ON Sound BUTTON',
    MenuOptionsSoundButtonPressed:'In game sound button pressed',
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
    public lifes:number = 1;
    public popSoundEffect:Phaser.Sound.BaseSound;
    public scoreManager:ScoreManager;
    public spawnManager:SpawnBubblesManager;
    

    constructor(public scene:Phaser.Scene){
        this.scene.events.on(LevelMangerEvents.LevelStateUpdate,this.updateLevelState,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectDistroyed,this.ObjectDestroyed,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectOutofBounds,this.ObjectOutOfBounds,this);
        this.scene.events.on(LevelMangerEvents.LevelTimeExpired,this.endHandler,this);
        
        this.scoreManager = new ScoreManager(this.scene);
        this.spawnManager = new SpawnBubblesManager(this.scene);
        
        this.popSoundEffect = this.scene.sound.add('BaloonPop');
        this.scene.events.on(LevelMangerEvents.BubbleObjectTap,(prefab:BubbleContainer)=>{
            console.log(prefab);
            this.popSoundEffect.play();  
        });

    }
    public checkLooseCondition() {
        if(this.lifes<=0){
            // game lost 
            this.scene.events.emit(LevelMangerEvents.LevelGameOver);
        }
    }
    public ObjectDestroyed(bubble:BubbleContainer){
        this.checkWinCondition();
    }   
    public ObjectOutOfBounds(bubble:BubbleContainer){
        this.lifes--;
        this.checkLooseCondition();
    }
    public updateLevelState() {
        
    }
    
    public checkWinCondition() {
        
    }   
    public endHandler() {
        // shwo menu 
    }
    public beginHandler() {
        
    }


}
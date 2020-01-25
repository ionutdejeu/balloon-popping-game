import Phaser from "phaser";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import { SpawnBubblesManager } from "../Prefabs/SpawnBubblesManager";
import { Level1Definition, LevelDefinition } from "./LevelDefinitions";
import { InGameMenuManager } from "./InGameMenuManager";

export const LevelMangerEvents = {
    LevelSuccesfullyCompleted:'Level Manage Level ended event',
    LevelGameOver:'Level Manager - GameOver',
    LevelStared:'Level Manager Level Started event',
    LevelRestart:'Level Manager Restart event',
    LevelObjectSpawned:'Level Manager Object spawned',
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
    public levesArr:LevelDefinition[]
    public currentLevel:LevelDefinition;
    
    public popSoundEffect:Phaser.Sound.BaseSound;
    public spawnManager:SpawnBubblesManager;
    inGameMenuManager: InGameMenuManager;
    public music:Phaser.Sound.BaseSound;
    
    
    constructor(public scene:Phaser.Scene){
        this.scene.events.on(LevelMangerEvents.LevelStateUpdate,this.updateLevelState,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectDistroyed,this.ObjectDestroyed,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectOutofBounds,this.ObjectOutOfBounds,this);
        this.scene.events.on(LevelMangerEvents.LevelTimeExpired,this.endHandler,this);
        this.scene.events.on(LevelMangerEvents.LevelRestart,this.beginHandler,this);
        this.scene.events.on(LevelMangerEvents.MenuOptionsMusicButtonePressed,this.toggleBackgroundMusic,this);
        
        this.levesArr = [Level1Definition];
        this.currentLevel = this.levesArr[0];
        // to do load data from storrage
        
        this.spawnManager = new SpawnBubblesManager(this.scene,this.currentLevel);
        
        
        this.popSoundEffect = this.scene.sound.add('BaloonPop');
        this.inGameMenuManager = new InGameMenuManager(this.scene,this.currentLevel);
        this.music = this.scene.sound.add('BackgroundMusic');
    
    }
    public loadStorageData(){

    }
    public toggleBackgroundMusic(){
        if(!this.music.isPaused){
            this.music.pause();
        }
        else{
            this.music.play();
        }
    }
    public checkLooseCondition() {
        if(this.lifes<=0){
            // game lost 
            this.scene.events.emit(LevelMangerEvents.LevelGameOver);
        }
    }
    public ObjectDestroyed(bubble:BubbleContainer){
        this.checkWinCondition();
        this.popSoundEffect.play(); 
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
        //this.scoreManager.restart();
        this.spawnManager.start(this.currentLevel);
        this.toggleBackgroundMusic();
    }


}
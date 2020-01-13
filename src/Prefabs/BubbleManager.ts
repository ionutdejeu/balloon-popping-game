import Phaser, { GameObjects } from "phaser";
import { ScoreManager } from "./ScoreManagerPrefab";
import { SpawnBubblesManager } from "./SpawnBubblesManager";
import { BubbleContainer } from "./BubbleContainer";


export const BUBBLE_EVENTS_CONSTANTS = {
    TAPONBUBBLE_EVENT:'TapOnBubbleEvent'
}
export class BubbleManager{
    public scene:Phaser.Scene;
    public popSoundEffect:Phaser.Sound.BaseSound;
    public scoreManager:ScoreManager;
    public spawnManager:SpawnBubblesManager;
     
    
    constructor(scene:Phaser.Scene){
        this.scene = scene;
        this.scoreManager = new ScoreManager(this.scene);
        this.spawnManager = new SpawnBubblesManager(this.scene);
        this.scene.events.on(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,(prefab:BubbleContainer)=>{
            console.log(prefab);
            this.popSoundEffect.play();
            
        })
        this.popSoundEffect = this.scene.sound.add('BaloonPop');
    }
    
     
 

     
    
}
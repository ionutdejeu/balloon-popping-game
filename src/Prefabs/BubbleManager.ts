import Phaser, { GameObjects } from "phaser";
import {BubblePrefab} from "./BubblePrefab";
import { ScoreManager } from "./ScoreManagerPrefab";
import { SpawnBubblesManager } from "./SpawnBubblesManager";


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
        this.spawnManager = new SpawnBubblesManager(this.scene)
        
    }

    public SetupUI(){
        this.scoreManager.setupUI();
        this.spawnManager.setup();
        this.SetupEvents();
    }

    public SoundSetup(){
        this.popSoundEffect = this.scene.sound.add('BaloonPop');
    }

    public SetupEvents(){
        this.scene.events.on(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,(prefab:BubblePrefab)=>{
            console.log(prefab);
            this.popSoundEffect.play();
            this.scoreManager.scoreChangedEventHandler(prefab);
        })
    }

    
}
import Phaser from "phaser";
import {BubblePrefab} from "./BubblePrefab";
import { ScoreManager } from "./ScoreManagerPrefab";

export default class BubbleManager{
    public prefabsArray:BubblePrefab[] = [];
    public scene:Phaser.Scene;
    public popSoundEffect:Phaser.Sound.BaseSound;
    public scoreManager:ScoreManager;
    constructor(scene:Phaser.Scene){
        this.scene = scene;
        this.scoreManager = new ScoreManager(this.scene);

    }

    public SetupUI(){
        this.scoreManager.setupUI();
    }

    public SoundSetup(){
        this.popSoundEffect = this.scene.sound.add('BaloonPop');
    }

    spawnRandomBubbles(prefabCount:number){
        for(let i=0;i<prefabCount;i++){
            
            const prefabInstance = new BubblePrefab(this.scene,
                Phaser.Math.Between(0, this.scene.cameras.main.width),
                this.scene.cameras.main.height,
                this.scoreManager.scoreChangedEventHandler
                );
            prefabInstance.bubbleSprite.on('pointerover', (event)=>{
                console.log(event);
                this.popSoundEffect.play();
            });
            this.prefabsArray.push(prefabInstance);
        }
    }

    
}
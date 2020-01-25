import Phaser, { GameObjects } from "phaser";
import { BubbleContainer } from "./BubbleContainer";
import { LevelMangerEvents } from "../Managers/LevelManager";
import { LevelDefinition } from "../Managers/LevelDefinitions";


export class SpawnBubblesManager {

    public fireLimit:number;
    public fireRate:number;
    public nexFire:Date;
    public projectiles:Phaser.Physics.Arcade.Group;
    public timedEvent:Phaser.Time.TimerEvent;
    public particles:Phaser.GameObjects.Particles.ParticleEmitterManager;
    
    constructor(
            public parentScene:Phaser.Scene,
            public definition:LevelDefinition
        ){    
        
        this.projectiles = this.parentScene.physics.add.group();
        this.parentScene.events.on(LevelMangerEvents.LevelObjectDistroyed,this.projectileDestoryed,this);
        this.parentScene.events.on(LevelMangerEvents.LevelObjectOutofBounds,this.projectileDestoryed,this);
        this.parentScene.events.on(LevelMangerEvents.MenuButtonPressed,(paused:boolean)=>{
           this.togglePause(paused);
        });
        this.start(this.definition);
    }

    public start(definition:LevelDefinition){
        this.definition = definition;
        this.fireLimit=definition.bubbleSpawnMax;
        this.fireRate=definition.bubbleSpawnRateInMillis;
        if(this.timedEvent === undefined){
            this.timedEvent = this.parentScene.time.addEvent({ delay: this.definition.bubbleSpawnRateInMillis, 
                callback: this.update, 
                callbackScope: this, 
                loop: true });
        }
        this.projectiles.clear(true,true);
        this.togglePause(false);
    }
    
    public togglePause(paused:boolean){
        this.timedEvent.paused=paused;
        this.projectiles.setVisible(!paused);  
        this.projectiles.active = !paused;
        if(paused){ 
            this.parentScene.physics.pause();   
        }
        else this.parentScene.physics.resume();
    }
   
    public update(eventData){
        if(this.fireLimit > this.projectiles.countActive()){
            const prefabInstance = new BubbleContainer(this.parentScene,null,this.definition);
            this.projectiles.add(prefabInstance);
            prefabInstance.afterPhysicsInit();
        }
    }

    public projectileDestoryed(prefab:BubbleContainer){
        prefab.destroy();
        this.projectiles.killAndHide(prefab);
        
    }
    
}
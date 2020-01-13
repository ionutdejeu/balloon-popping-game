import Phaser, { GameObjects } from "phaser";
import { BubblePrefab } from "./BubblePrefab";
import { BUBBLE_EVENTS_CONSTANTS } from "./BubbleManager";
import { BubbleContainer } from "./BubbleContainer";

export const EVENTS_CONSTANTS ={
    UPDATE_EVENT:'WeponPrefabUpdate',
    FIRE_EVENT:'FireWeponPrefab',
    DESTROY_EVENT:'WeponPrefab_ProjectileDestroyed'
}
export class SpawnBubblesManager {

    public fireLimit:number;
    public fireRate:number;
    public nexFire:Date;
    public projectiles:Phaser.Physics.Arcade.Group;
    public timedEvent:Phaser.Time.TimerEvent;
    public particles:Phaser.GameObjects.Particles.ParticleEmitterManager;
    
    constructor(public parentScene:Phaser.Scene){    
        this.fireLimit=20;
        this.fireRate=1000;
        this.projectiles = this.parentScene.physics.add.group();
        
        this.parentScene.events.on(EVENTS_CONSTANTS.UPDATE_EVENT,this.update,this);
        this.parentScene.events.on(EVENTS_CONSTANTS.FIRE_EVENT,this.fire,this);
        this.parentScene.events.on(EVENTS_CONSTANTS.DESTROY_EVENT,this.projectileDestoryed,this);
        this.timedEvent = this.parentScene.time.addEvent({ delay: this.fireRate, 
            callback: this.update, 
            callbackScope: this, 
            loop: true });
        
        this.parentScene.events.on(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,this.projectileDestoryed,this);
        this.particles = this.parentScene.add.particles('bubbleExplosionParticle');
    }

   
    public update(eventData){
        this.fire();
        //TODO: Check if outside of bounds 
    }
    public fire(){
        console.log(this.projectiles);
        if(this.fireLimit > this.projectiles.countActive()){
            const prefabInstance = new BubbleContainer(this.parentScene,
                Phaser.Math.Between(0, this.parentScene.cameras.main.width),
                this.parentScene.cameras.main.height,null,this.particles);
            this.projectiles.add(prefabInstance);
            prefabInstance.afterPhysicsInit();
        }
    }

    public projectileDestoryed(prefab:BubbleContainer){
        console.log('emi particles',prefab.x,prefab.y);
    
        prefab.destroy();
        this.projectiles.killAndHide(prefab);
        
    }
     

    public killBubble(prefab:BubblePrefab){
        
    }
    
}
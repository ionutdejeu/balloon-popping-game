import Phaser, { GameObjects } from "phaser";
import { BubblePrefab } from "./BubblePrefab";
import { BUBBLE_EVENTS_CONSTANTS } from "./BubbleManager";

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
    }

    public setup(){
        this.projectiles = this.parentScene.physics.add.group();
        
        this.parentScene.events.on(EVENTS_CONSTANTS.UPDATE_EVENT,this.update,this);
        this.parentScene.events.on(EVENTS_CONSTANTS.FIRE_EVENT,this.fire,this);
        this.parentScene.events.on(EVENTS_CONSTANTS.DESTROY_EVENT,this.projectileDestoryed,this);
        this.timedEvent = this.parentScene.time.addEvent({ delay: this.fireRate, 
            callback: this.update, 
            callbackScope: this, 
            loop: true });
        // this.explosionDelayTimedEvent = this.parentScene.time.addEvent({ delay: 500, 
        //     callback: this.killBubble, 
        //     callbackScope: this });
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
            const prefabInstance = new BubblePrefab(this.parentScene,
                Phaser.Math.Between(0, this.parentScene.cameras.main.width),
                this.parentScene.cameras.main.height,this.particles);
            this.projectiles.add(prefabInstance.bubbleSprite);
            prefabInstance.setRandomSpeed();
        }
    }

    public projectileDestoryed(prefab:BubblePrefab){
        console.log('emi particles',prefab.bubbleSprite.x,prefab.bubbleSprite.y);
        this.projectiles.killAndHide(prefab.bubbleSprite); 
    }

    public killBubble(prefab:BubblePrefab){

    }
    
}
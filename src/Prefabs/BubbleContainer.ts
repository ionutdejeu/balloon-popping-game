import Phaser from "phaser";
import Atlasses from '../Data/Atlasses';
import {BUBBLE_EVENTS_CONSTANTS} from './BubbleManager'
import { EVENTS_CONSTANTS } from "./SpawnBubblesManager";
import { InGameMenuEvents } from "../Scenes/InGameMenuScene";


export const bubbleColorsOptions = {
    red:0xff0000,
    blue:0x0000FF,

}

export interface Behaviour<T>{ 
    execute(param:T);
}
export class StandardSpawnBehaviour implements Behaviour<BubbleContainer>{
    execute(prefab:BubbleContainer){
        prefab.setPosition(Phaser.Math.Between(prefab.sizeXY/2, prefab.scene.cameras.main.width-prefab.sizeXY/2),
                prefab.scene.cameras.main.height);
    }
}

export class ColoredBubbleTabBehaviour implements Behaviour<BubbleContainer>
{
    public colorSuccessions = [
        0x00F,
        0x0F0,
        0xF00
    ]
    public bubbleHealth = 3; 
    execute(bubblePrefab: BubbleContainer) {
        if(!bubblePrefab.gamePaused){
            bubblePrefab.bubbleSprite.setTint(this.colorSuccessions[this.bubbleHealth-1]);
            this.bubbleHealth--;
            if(this.bubbleHealth<=0){ 
                bubblePrefab.killBehaviour.execute(bubblePrefab);
            }
        }
    }
}
export class StandardBubbleTapBehaviour implements Behaviour<BubbleContainer>
{
    execute(bubblePrefab: BubbleContainer) {
        if(!bubblePrefab.gamePaused){
            bubblePrefab.killBehaviour.execute(bubblePrefab);
        }
    }
}
export class StandardBubbleKillBehavior implements Behaviour<BubbleContainer>{
    execute(param:BubbleContainer){
            param.bubbleSprite.setTint(0xff0000);
            param.particleEmitter.explode(10,param.x,param.y);
            param.scene.events.emit(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,param);
        }
}
export class BubbleContainer extends Phaser.GameObjects.Container{

    public scoreValue:number = 1;
    public bubbleSprite:Phaser.GameObjects.Sprite; 
    public arcadePhysicsBody: Phaser.Physics.Arcade.Body;
    public sizeXY:number;
    public particleEmitter:Phaser.GameObjects.Particles.ParticleEmitter;
    public interalTimer:Phaser.Time.TimerEvent;
    public gamePaused:boolean = false;
    public tapBehaviour: Behaviour<BubbleContainer>;
    public killBehaviour: Behaviour<BubbleContainer>;
    public spawnBehaviour: Behaviour<BubbleContainer>;

    constructor(public scene:Phaser.Scene,
        children:Phaser.GameObjects.GameObject[],
        public particleManager:Phaser.GameObjects.Particles.ParticleEmitterManager
        ) 
        {
            super(scene, 0, 0,children);
            this.sizeXY = Phaser.Math.Between(50,100);

            this.spawnBehaviour = new StandardSpawnBehaviour();
            this.spawnBehaviour.execute(this);
            
            //Graphics 
            this.bubbleSprite = scene.physics.add.sprite(0, 0, 'bubble', 0);
            this.bubbleSprite.setOrigin(0.5,0.5);
            
            this.bubbleSprite.setDisplaySize(this.sizeXY,this.sizeXY);
            this.bubbleSprite.setPosition(-this.sizeXY/2,-this.sizeXY/2);
            //this.bubbleSprite.setSize(this.sizeXY,this.sizeXY);
            this.setInteractive(
                new Phaser.Geom.Circle(0,0, this.sizeXY/2),
                Phaser.Geom.Circle.Contains);
            
            this.setSize(this.sizeXY, this.sizeXY);
            this.scene.physics.world.enable(this);

            //particles 
            this.particleEmitter = particleManager.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.5, end: 2.5 },
                speed: 20,
                accelerationY: 300,
                angle: { min: -85, max: -95 },
                rotate: { min: -180, max: 180 },
                lifespan: { min: 500, max: 700 },
                blendMode: 'ADD',
                frequency: 110,
                maxParticles: 4,
                on:false, // initally set to inactive;
            });
            this.tapBehaviour = new ColoredBubbleTabBehaviour();
            this.killBehaviour = new StandardBubbleKillBehavior();

            this.on('pointerover',(event)=>{
                //this.bubbleSprite.setTint(0x44ff44);
            });
            this.bubbleSprite.on('pointerdown', (event)=> {
                console.log(this);    
            });
            this.on('pointerdown', (event)=> {
                this.tapBehaviour.execute(this);
            });
            this.on(InGameMenuEvents.TAP_PAUSEMENU,(paused:boolean)=>{
                this.gamePaused = paused;
                console.log('container:paused');
            });
            this.on('pointerout', (event)=> {
                console.log(this);
                this.bubbleSprite.clearTint();
            });
            this.add(this.bubbleSprite);
            scene.add.existing(this);
             
    }
    public afterPhysicsInit(){
          
         this.arcadePhysicsBody =  <Phaser.Physics.Arcade.Body>this.body;
         this.arcadePhysicsBody.setVelocity(0,Phaser.Math.Between(-200,-100));
         this.interalTimer = this.scene.time.addEvent({ delay: 1000, 
             callback: this.checkSpritesOutOfBoundes, 
             callbackScope: this, 
             loop: true });
    }
 
    public checkSpritesOutOfBoundes(){
        let bounds = new Phaser.Geom.Rectangle(); 
        this.arcadePhysicsBody.getBounds(bounds);
        if(!Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds,bounds)){
            // kill the sprite 
            this.scene.events.emit(EVENTS_CONSTANTS.DESTROY_EVENT,this);
        }
    
    }
    public destroy(){
        // destroy the emitter 
        // destroy the sprite 
        this.interalTimer.remove(false)
        this.interalTimer.destroy();
        super.destroy();
        this.particleEmitter.stop();
    } 
    
}
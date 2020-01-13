import Phaser from "phaser";
import Atlasses from '../Data/Atlasses';
import {BUBBLE_EVENTS_CONSTANTS} from './BubbleManager'
import { EVENTS_CONSTANTS } from "./SpawnBubblesManager";


export const bubbleColorsOptions = {
    red:0xff0000,
    blue:0x0000FF
}

export interface BubbleTapHandler{ 
    handleClickEvent(event);
}

export class StandardBubbleTabHandler implements BubbleTapHandler
{
    handleClickEvent(bubblePrefab: BubbleContainer) {
        
        if(bubblePrefab.tapCallback != null) bubblePrefab.tapCallback(bubblePrefab);
        
    }
}
export class BubbleContainer extends Phaser.GameObjects.Container{

    public scoreValue:number = 20;
    public bubbleSprite:Phaser.GameObjects.Sprite; 
    public innerContentSprite:Phaser.GameObjects.Sprite;
    public arcadePhysicsBody: Phaser.Physics.Arcade.Body;
    public sizeXY:number;
    public tapCallback?:(BubblePrefab)=>void;
    public particleEmitter:Phaser.GameObjects.Particles.ParticleEmitter;
    public interalTimer:Phaser.Time.TimerEvent;
     

    constructor(public scene:Phaser.Scene,
        posX:number,
        posY:number,
        children:Phaser.GameObjects.GameObject[],
        public particleManager:Phaser.GameObjects.Particles.ParticleEmitterManager
        ) 
        {
            
            super(scene, posX, posY,children);
                
            this.bubbleSprite = scene.physics.add.sprite(0, 0, 'bubble', 0);
            this.bubbleSprite.setOrigin(0.5,0.5);
            this.sizeXY = Phaser.Math.Between(50,100);
            this.bubbleSprite.setDisplaySize(this.sizeXY,this.sizeXY);
            //this.bubbleSprite.setSize(this.sizeXY,this.sizeXY);
            this.setInteractive(new Phaser.Geom.Circle(0, 0, this.sizeXY),Phaser.Geom.Circle.Contains);
            
            const graphics = this.scene.add.graphics();
            graphics.lineStyle(2, 0x00ffff, 1);
            graphics.strokeCircle(0, 0, this.input.hitArea.radius);
            this.add(graphics);
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

            this.on('pointerover',(event)=>{
                this.bubbleSprite.setTint(0x44ff44);
            });
            this.bubbleSprite.on('pointerdown', (event)=> {
                console.log(this);    
            });
            this.on('pointerdown', (event)=> {
                this.bubbleSprite.setTint(0xff0000);
                this.particleEmitter.explode(10,this.x,this.y);
                this.scene.events.emit(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,this);
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
import Phaser from "phaser";
import Atlasses from '../Data/Atlasses';
import {BUBBLE_EVENTS_CONSTANTS} from './BubbleManager'


export const bubbleColorsOptions = {
    red:0xff0000,
    blue:0x0000FF
}

export interface BubbleTapHandler{ 
    handleClickEvent(event);
}

export class StandardBubbleTabHandler implements BubbleTapHandler
{
    handleClickEvent(bubblePrefab: BubblePrefab) {
        
        if(bubblePrefab.tapCallback != null) bubblePrefab.tapCallback(bubblePrefab);
        
    }
}
export class BubblePrefab {

    public scoreValue:number = 20;
    public bubbleSprite:Phaser.GameObjects.Sprite; 
    public innerContentSprite:Phaser.GameObjects.Sprite;
    public arcadePhysicsBody: Phaser.Physics.Arcade.Body;
    public sizeXY:number;
    public tapCallback?:(BubblePrefab)=>void;
    public particleEmitter:Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(public scene:Phaser.Scene,
        posX:number,
        posY:number,
        particleManager:Phaser.GameObjects.Particles.ParticleEmitterManager
        ){
        this.bubbleSprite = scene.physics.add.sprite(posX, posY, 'bubble', 0);
        this.bubbleSprite.setOrigin(0.5,0.5);
        this.bubbleSprite.setInteractive();
        this.sizeXY = Phaser.Math.Between(50,150);
        this.bubbleSprite.setDisplaySize(this.sizeXY,this.sizeXY)
         
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
        
        this.bubbleSprite.on('pointerover', (event)=> {
            this.bubbleSprite.setTint(0xff0000);
            this.particleEmitter.explode(4,this.bubbleSprite.x,this.bubbleSprite.y);
            this.scene.events.emit(BUBBLE_EVENTS_CONSTANTS.TAPONBUBBLE_EVENT,this);
        });    
        this.bubbleSprite.on('pointerout', (event)=> {
            this.bubbleSprite.clearTint();
        });
    }

    public setRandomSpeed(){
        this.arcadePhysicsBody =  <Phaser.Physics.Arcade.Body>this.bubbleSprite.body;
        this.arcadePhysicsBody.setVelocity(0,Phaser.Math.Between(-100,-50));
    }
}
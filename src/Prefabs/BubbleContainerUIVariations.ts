import Phaser, { GameObjects, Scene } from 'phaser'
import { LevelDefinition } from '../Managers/LevelDefinitions';

export interface BubbleGraphics {
    animateReaction();
    animateDestroy();
    getSizeXY();
    
}
export class BubbleStandardGraphics extends GameObjects.Container implements BubbleGraphics{
    getSizeXY() {
        return this.sizeXY;
    }
    public particleEmitter:Phaser.GameObjects.Particles.ParticleEmitter;
    public particleManager:Phaser.GameObjects.Particles.ParticleEmitterManager
    public bubbleSprite:Phaser.GameObjects.Sprite;
    public sizeXY:number;

    animateReaction() {
        //nothing 
    }
    animateDestroy() {
        this.bubbleSprite.setTint(0xff0000);
        console.log("Animate Destroy",this.x,this.y)
        this.particleEmitter.explode(10,this.bubbleSprite.x,this.bubbleSprite.y);
    }
    constructor(
            public scene:Scene,
            public definition:LevelDefinition
        ){
        super(scene,0,0,null);
        this.sizeXY = Phaser.Math.Between(definition.bubbleMinSizeXY,definition.bubbleMaxSizeXY);

        //Graphics 
        this.bubbleSprite = scene.physics.add.sprite(0, 0, 'bubble', 0);
        this.bubbleSprite.setOrigin(0.5,0.5);
        
        this.bubbleSprite.setDisplaySize(this.sizeXY,this.sizeXY);
        this.bubbleSprite.setPosition(-this.sizeXY/2,-this.sizeXY/2);
        
        this.bubbleSprite.on('pointerdown', (event)=> {
            console.log(this);    
        });

        this.on('pointerout', (event)=> {
            console.log(this);
            this.bubbleSprite.clearTint();
        });
        
        //particles 
        this.particleManager = this.scene.add.particles('bubbleExplosionParticle');
        this.particleEmitter = this.particleManager.createEmitter({
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
        this.add(this.bubbleSprite);
        this.scene.add.existing(this);
    }
    public destroy(){
        this.particleManager.destroy();
        this.particleEmitter.stop();
        super.destroy();
    } 
}
export class MultiColoreBubbleGraphics extends BubbleStandardGraphics{
    public colorSuccessions = [
        0x00F,
        0x0F0,
        0xF00
    ]
    public colorIndex:number=0;
    constructor(
        public scene:Scene,
        public definition:LevelDefinition  
    ){
        super(scene,definition);
    }
    public animateReaction(){
        this.bubbleSprite.setTint(this.colorSuccessions[this.colorIndex%3]);
        this.colorIndex++;
    }   
}
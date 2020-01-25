import Phaser from "phaser";
import Atlasses from '../Data/Atlasses';
import { LevelMangerEvents } from "../Managers/LevelManager";
import { BubbleGraphics, BubbleStandardGraphics } from "./BubbleContainerUIVariations";
import { LevelDefinition } from "../Managers/LevelDefinitions";


export const bubbleColorsOptions = {
    red:0xff0000,
    blue:0x0000FF,

}

export interface Behaviour<T>{ 
    execute(param:T);
}
export class StandardSpawnBehaviour implements Behaviour<BubbleContainer>{
    
    execute(prefab:BubbleContainer){
        prefab.setPosition(
            Phaser.Math.Between(
                prefab.ui.getSizeXY()/2, 
                prefab.scene.cameras.main.width-prefab.ui.getSizeXY()/2),
        prefab.scene.cameras.main.height);
    }
}

export class ColoredBubbleTabBehaviour implements Behaviour<BubbleContainer>
{
    public bubbleHealth = 3; 
    execute(bubblePrefab: BubbleContainer) {
        if(!bubblePrefab.gamePaused){
            bubblePrefab.ui.animateReaction();
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
            param.ui.animateDestroy();
            param.scene.events.emit(LevelMangerEvents.LevelObjectDistroyed,param);
        }
}
export class BubbleContainer extends Phaser.GameObjects.Container{

    public scoreValue:number = 1;
    public arcadePhysicsBody: Phaser.Physics.Arcade.Body;
    
    public interalTimer:Phaser.Time.TimerEvent;
    public gamePaused:boolean = false;
    public tapBehaviour: Behaviour<BubbleContainer>;
    public killBehaviour: Behaviour<BubbleContainer>;
    public spawnBehaviour: Behaviour<BubbleContainer>;
    public ui:BubbleStandardGraphics;
    constructor(
        public scene:Phaser.Scene,
        children:Phaser.GameObjects.GameObject[],
        public definition:LevelDefinition
        ) 
        {
            super(scene, 0, 0,children);
            this.ui = new BubbleStandardGraphics(this.scene,definition);
            this.add(this.ui);
            
            this.spawnBehaviour = new StandardSpawnBehaviour();
            this.spawnBehaviour.execute(this);
            
            this.setInteractive(
                new Phaser.Geom.Circle(0,0, this.ui.getSizeXY()/2),
                Phaser.Geom.Circle.Contains);
            
            this.setSize(
                this.ui.getSizeXY(), 
                this.ui.getSizeXY()
                );
            this.scene.physics.world.enable(this);

          
            this.tapBehaviour = new StandardBubbleTapBehaviour();
            this.killBehaviour = new StandardBubbleKillBehavior();

            this.on('pointerover',(event)=>{
                //this.bubbleSprite.setTint(0x44ff44);
            });
            
            this.on('pointerdown', (event)=> {
                this.tapBehaviour.execute(this);
            });
           
            scene.add.existing(this);
             
    }
    public afterPhysicsInit(){
          
         this.arcadePhysicsBody =  <Phaser.Physics.Arcade.Body>this.body;
         this.arcadePhysicsBody.setVelocity(0,Phaser.Math.Between(this.definition.bubbleMinSpeed,this.definition.bubbleMaxSpeed));
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
            this.scene.events.emit(LevelMangerEvents.LevelObjectOutofBounds,this);
        }
    
    }
    public destroy(){
        // destroy the emitter 
        // destroy the sprite 
        this.ui.destroy();
        this.interalTimer.remove(false)
        this.interalTimer.destroy();
        super.destroy();
    } 
    
}
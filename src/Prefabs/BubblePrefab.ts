import Phaser, { MathPhaser } from "phaser";
import Atlasses from '../Data/Atlasses';


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
export class BubblePrefab{

    public scoreValue:number = 20;
    public bubbleSprite:Phaser.GameObjects.Sprite; 
    public innerContentSprite:Phaser.GameObjects.Sprite;
    public arcadePhysicsBody: Phaser.Physics.Arcade.Body;
    public sizeXY:number;
    public tapCallback?:(BubblePrefab)=>void;
    constructor(scene:Phaser.Scene,
        posX:number,
        posY:number,
        tapCallback?:(prefab:BubblePrefab)=>void,
        bubblContent?:Phaser.GameObjects.GameObject
        ){
        this.bubbleSprite = scene.physics.add.sprite(posX, posY, 'bubble', 0);
        this.bubbleSprite.setOrigin(0.5,0.5);
        this.bubbleSprite.setInteractive();
        this.sizeXY = Phaser.Math.Between(50,150);
        this.bubbleSprite.setDisplaySize(this.sizeXY,this.sizeXY)
         //this.bubbleSprite.setScale()
        this.arcadePhysicsBody =  <Phaser.Physics.Arcade.Body>this.bubbleSprite.body;
        this.arcadePhysicsBody.setVelocity(0,Phaser.Math.Between(-100,-50));
        
        this.bubbleSprite.on('pointerover', (event)=> {
            this.bubbleSprite.setTint(0xff0000);
            if(this.tapCallback != null) this.tapCallback(this);
            
        });    
        this.bubbleSprite.on('pointerout', (event)=> {
            this.bubbleSprite.clearTint();
        });
    }
}
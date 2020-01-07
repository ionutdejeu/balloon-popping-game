import Phaser from "phaser";


export default class SpriteButton{

    scene:Phaser.Scene
    sprite:Phaser.GameObjects.Sprite;
    constructor(scene:Phaser.Scene,posX:number,posY:number,options:any){
        this.scene =scene;
    }
    
}
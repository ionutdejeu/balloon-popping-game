import Phaser from "phaser";


export default class SpriteButton{

    scene:Phaser.Scene
    sprite:Phaser.GameObjects.Sprite;
    constructor(scene:Phaser.Scene,posX:number,posY:number,resourceKey:string){
        this.scene =scene;
        this.sprite = this.scene.add.sprite(posX, posY, resourceKey).setInteractive();
        this.sprite.on('pointerover', function (event) {
            this.setTint(0xff0000);
        });    
        this.sprite.on('pointerout', function (event) {
            this.clearTint();
        });
    }   
}
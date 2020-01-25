import Phaser from "phaser";
import TextButton from "./TextButton";


export default class ButtonPannel{
    public childElements:Array<TextButton>;
    buttonHeight:number=100;
    buttonWidht:number=100;
    scene:Phaser.Scene;
    positionX:number;
    positionY:number;
    constructor(scene:Phaser.Scene,posX:number,posY:number){
        this.childElements = new Array<TextButton>();
        this.scene=scene;
        this.positionX = posX;
        this.positionY = posY;
    }
    addTextButton(text:string,callback:()=>void){
        // calculate next button position based on weidth and height 
        this.childElements.push(
            new TextButton(this.scene, 
                this.positionX ,
                this.positionY+ this.buttonHeight*this.childElements.length,
                text,callback)
        );
    }
} 
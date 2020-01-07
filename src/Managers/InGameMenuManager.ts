import Phaser from "phaser";
import ButtonPannel from "../Controls/ButtonPannel";
import { MainLevel_Constants } from "../scenes/MainLevelScene";

export const MAIN_MENU_EVENTS = {
    MAIN_MENU_STARTGAME:'MAIN MENU START GAME OPTION',
    MAIN_MENU_QUIT:'MAIN MENU QUIT ITEM OPTION',

}

export class InGameMenuManager{
    
    levelRemainingTime:Phaser.GameObjects.Graphics; 
    
    constructor(public scene:Phaser.Scene){
        // this.levelRemainingTime= this.scene.add.graphics({
        //     x: 0,
        //     y: 0,
        //     lineStyle: {
        //         width: 1,
        //         color: 0xffffff,
        //         alpha: 1
        //     },
        //     fillStyle: {
        //         color: 0xffffff,
        //         alpha: 1
        //     }
        // });
        this.dummyFunction();
    }
    dummyFunction(){
        var graphics = this.scene.add.graphics();

        graphics.lineStyle(50, 0xffffff);

        graphics.beginPath();
        graphics.arc(400, 300, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(350), true, 0.02);
        graphics.strokePath();
        graphics.closePath();

        graphics.beginPath();
        graphics.lineStyle(40, 0xff00ff);
        graphics.arc(400, 300, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(350), true, 0.02);
        graphics.strokePath();
        graphics.closePath();

        var color = 0xffffff;
        var thickness = 40;
        var alpha = 0.5;

        graphics.lineStyle(thickness, color, alpha);

        graphics.strokeRect(32, 32, 256, 128);


        color = 0xffff00;
        graphics.fillStyle(color, alpha);
        graphics.fillRect(32, 32, 256, 128);

    }

    draTime(){
        
    }


}
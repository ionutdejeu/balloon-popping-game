import Phaser, { MathPhaser } from "phaser";
import TextLabel from "../Controls/TextLabelControl";
import { BubbleContainer } from "./BubbleContainer";


export class ScoreManager {
    
    public score:number=0;
    scene:Phaser.Scene;
     
    label:TextLabel;
    constructor(scene:Phaser.Scene){

        this.scene=scene;
        
    }

    
    public scoreChangedEventHandler(bubblePrefabOrigin:BubbleContainer){
        console.log('Score Manager::UpdateScore');
        this.score +=bubblePrefabOrigin.scoreValue;
        this.label.textGameObject.text = "Score: "+this.score;
    }

}
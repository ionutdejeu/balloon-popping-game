import Phaser, { MathPhaser } from "phaser";
import TextLabel from "../Controls/TextLabelControl";
import { BubblePrefab } from "./BubblePrefab";


export class ScoreManager {
    
    public score:number=0;
    scene:Phaser.Scene;
     
    label:TextLabel;
    constructor(scene:Phaser.Scene){

        this.scene=scene;
        
    }

    public setupUI(){
        this.label = new TextLabel(this.scene,
            this.scene.cameras.main.centerX,100,'Score: '+this.score);
    }

    public scoreChangedEventHandler(bubblePrefabOrigin:BubblePrefab){
        console.log('Score Manager::UpdateScore');
        this.score +=bubblePrefabOrigin.scoreValue;
        this.label.textGameObject.text = "Score: "+this.score;
    }

}
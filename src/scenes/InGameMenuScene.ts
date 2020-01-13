import Phaser from "phaser";
import { ProgressBar } from "../Controls/ProgressBar";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import TextLabel from "../Controls/TextLabelControl";


export const InGameMenuEvents = {
    LEVEL_TIME_EXPIRED:'MAIN MENU START GAME OPTION',
    TAP_PAUSEMENU:'IN GAME MENU TAP ON Pause Button',
}
export const InGameMenuConstant= {
    SceneKey:'InGameMenu'
}

export class InGameMenuScene extends Phaser.Scene {
    
    levelTimeProgressBar:ProgressBar;
    public levelTimer:Phaser.Time.TimerEvent;
    score: number;
    label:TextLabel;
    levelTimeLable:TextLabel;
    inGameMenuContainer:Phaser.GameObjects.Container;
    toggleMenuSpriteBtn:Phaser.GameObjects.Sprite;
    
    constructor(){
        super({key:InGameMenuConstant.SceneKey});
        this.score=0;
        
    }

    preload():void {
        this.load.setPath('assets/images');
        this.load.image('exitapp_btn','button_exitapp.png');
        this.load.image('mute_btn','button_mute.png');
        this.load.image('toggleMenu_btn','button_togglemenu.png');
        this.load.image('unmute_btn','button_unmute.png');
        
    }
    create(): void {
        this.levelTimeProgressBar = new ProgressBar(this,0,0,
            new Phaser.Geom.Rectangle(0,0,this.cameras.main.width,30));
        this.label = new TextLabel(this,
                this.cameras.main.centerX,100,'Score: '+this.score);
        this.levelTimeLable = new TextLabel(this,this.cameras.main.centerX,50,'Remaining time: '+this.levelTimeProgressBar.value);
        this.levelTimer = this.time.addEvent({ delay: 1000, 
            callback: this.updateTimer, 
            callbackScope: this, 
            loop: true });
        this.inGameMenuContainer = this.add.container(0,0);
        this.inGameMenuContainer.setVisible(false);
        this.toggleMenuSpriteBtn= this.add.sprite(this.cameras.main.width-30,55,'toggleMenu_btn');
        this.toggleMenuSpriteBtn.setDisplaySize(50,50);
        this.toggleMenuSpriteBtn.setInteractive();
        this.toggleMenuSpriteBtn.on('pointerdown', (event)=> {
            console.log(this.inGameMenuContainer);  
        });
    }
    updateTimer(){
        if(!this.levelTimeProgressBar.decrease(1)){
            // trigger the event for this scene
            this.levelTimeLable.textGameObject.text = "Remaining time: "+this.levelTimeProgressBar.value;
        }
        else{
            // stop the game 
        }
    }

    public scoreChangedEventHandler(bubblePrefabOrigin:BubbleContainer){
        console.log('Score Manager::UpdateScore');
        this.score +=bubblePrefabOrigin.scoreValue;
        this.label.textGameObject.text = "Score: "+this.score;
    }

    private setContainerConfig(container:Phaser.GameObjects.Container)
    {
        
        const graphics = this.add.graphics();
        
        graphics.lineStyle(2, 0xffff00, 1);

        //  32px radius on the corners
        graphics.strokeRoundedRect(32, 32, 300, 200, 32);

        graphics.lineStyle(4, 0xff00ff, 1);

        //  Using an object to define a different radius per corner
        graphics.strokeRoundedRect(360, 240, 400, 300, { tl: 64, tr: 22, bl: 12, br: 0 });
        //  BG
        // graphics.fillStyle(0x62C2CC);
        // graphics.fillRect(this.x, this.y, this.rectangle.width, this.rectangle.height+2);
         
    }

}
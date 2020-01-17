import Phaser, { Display } from "phaser";
import { ProgressBar } from "../Controls/ProgressBar";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import TextLabel from "../Controls/TextLabelControl";


export const InGameMenuEvents = {
    LEVEL_TIME_EXPIRED:'MAIN MENU START GAME OPTION',
    TAP_PAUSEMENU:'IN GAME MENU TAP ON Pause Button',
    TAP_SOUNDBUTTON:'IN GAME MENU TAP ON Sound BUTTON',
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
    public gameIsPaused:boolean=false;
    public musicMute:boolean=false;
    
    inGameMenuContainer:Phaser.GameObjects.Container;
    toggleMenuSpriteBtn:Phaser.GameObjects.Sprite;
    public scaleConfiguration =  {
        canvas_width_max : 2048,					
        canvas_width : 1000,						
        canvas_height_max : 2048,				
        canvas_height : 650,						
        scale_ratio : 1,							
        aspect_ratio : 1							
    };

    constructor(){
        super({key:InGameMenuConstant.SceneKey});
        this.score=0;
            
        this.scaleConfiguration.canvas_width = window.screen.availWidth * window.devicePixelRatio;
        this.scaleConfiguration.canvas_height = window.screen.availHeight * window.devicePixelRatio;
        this.scaleConfiguration.aspect_ratio = this.scaleConfiguration.canvas_width / this.scaleConfiguration.canvas_height;
        if (this.scaleConfiguration.aspect_ratio < 1) 
            this.scaleConfiguration.scale_ratio = this.scaleConfiguration.canvas_height 
            / this.scaleConfiguration.canvas_height_max;
        else 
            this.scaleConfiguration.scale_ratio = this.scaleConfiguration.canvas_width 
            / this.scaleConfiguration.canvas_width_max;
            
            
            
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
        //this.setContainerConfig(this.inGameMenuContainer);
        this.toggleMenuSpriteBtn= this.add.sprite(this.cameras.main.width-30,55,'toggleMenu_btn');
        this.toggleMenuSpriteBtn
            .setDisplaySize(50,50)
            .setInteractive()
            .setScale(this.scaleConfiguration.scale_ratio/10,this.scaleConfiguration.scale_ratio/10)
            .on('pointerdown', (event)=> {
                console.log(this.inGameMenuContainer); 
                this.gameIsPaused = !this.gameIsPaused;
                this.inGameMenuContainer.setVisible(this.gameIsPaused);
                this.levelTimer.paused=this.gameIsPaused;
                this.events.emit(InGameMenuEvents.TAP_PAUSEMENU,this.gameIsPaused);
            })
            
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
        //container.setDepth(100);
        container.setPosition(0,0);
        container.setSize(this.cameras.main.width,this.cameras.main.height);
        console.log(container);
        const graphics = this.add.graphics();
        
        graphics.lineStyle(2, 0xffff00, 1);
        //  32px radius on the corners
        graphics.strokeRoundedRect(100, 100, this.cameras.main.width-200, this.cameras.main.height-200, 32);
        //  BG
        graphics.fillStyle(0xFDB813);
        graphics.fillRoundedRect(101, 101, this.cameras.main.width-202, this.cameras.main.height-202, 32);
        graphics.closePath();
        
        
        container.add(graphics);

        const muteButtonLabel = new TextLabel(this,0,0,'Mute Sound');
        
        muteButtonLabel.textGameObject.setDepth(200);
        container.add(muteButtonLabel.textGameObject);
        Display.Align.In.RightCenter(muteButtonLabel.textGameObject,container,0,10);
        

        const quitGame = new TextLabel(this,0,0,'Quit game');
        quitGame.textGameObject.setDepth(-200);
        container.add(quitGame.textGameObject);
        Display.Align.To.BottomCenter(quitGame.textGameObject,muteButtonLabel.textGameObject,0,10);
    }

}
import Phaser, { Display } from "phaser";
import { ProgressBar } from "../Controls/ProgressBar";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import TextLabel from "../Controls/TextLabelControl";
import TextButton from "../Controls/TextButton";
import { LevelMangerEvents } from "./LevelManager";



 
export class InGameMenuManager {
    
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

    constructor(public scene:Phaser.Scene){
        
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
            
        this.create();
            
    }

    /**
     * Static method to allow for preloading of asseets before any instance of this class is made 
     * @param scene 
     */
    public static preload(scene:Phaser.Scene):void {
        scene.load.setPath('assets/images');
        scene.load.image('exitapp_btn','button_exitapp.png');
        scene.load.image('mute_btn','button_mute.png');
        scene.load.image('toggleMenu_btn','button_togglemenu.png');
        scene.load.image('unmute_btn','button_unmute.png');
        
    }
    create(): void {
        this.levelTimeProgressBar = new ProgressBar(this.scene,0,0,
            new Phaser.Geom.Rectangle(0,0,this.scene.cameras.main.width,30));
        this.levelTimeProgressBar.bar.setDepth(202);

        this.label = new TextLabel(this.scene,
                this.scene.cameras.main.centerX,100,'Score: '+this.score);
        this.levelTimeLable = new TextLabel(this.scene,this.scene.cameras.main.centerX,50,'Remaining time: '+this.levelTimeProgressBar.value);
        this.levelTimer = this.scene.time.addEvent({ delay: 1000, 
            callback: this.updateTimer, 
            callbackScope: this, 
            loop: true });
        this.inGameMenuContainer = this.scene.add.container(0,0);
        this.inGameMenuContainer.setVisible(false).setDepth(201);
        this.setContainerConfig(this.inGameMenuContainer);
        
        this.toggleMenuSpriteBtn= this.scene.add.sprite(this.scene.cameras.main.width-30,55,'toggleMenu_btn');
        this.toggleMenuSpriteBtn
            .setDisplaySize(50,50)
            .setInteractive()
            .setScale(this.scaleConfiguration.scale_ratio/10,this.scaleConfiguration.scale_ratio/10)
            .on('pointerdown', (event)=> {
                console.log(this.inGameMenuContainer); 
                this.gameIsPaused = !this.gameIsPaused;
                this.inGameMenuContainer.setVisible(this.gameIsPaused);
                this.levelTimer.paused=this.gameIsPaused;
                this.scene.events.emit(LevelMangerEvents.MenuButtonPressed,this.gameIsPaused);
            });
        
            
    }
    updateTimer(){
        
        if(!this.levelTimeProgressBar.decrease(1)){
            // trigger the event for this scene
            this.levelTimeLable.textGameObject.text = "Remaining time: "+this.levelTimeProgressBar.value;
            this.scene.events.emit(LevelMangerEvents.LevelStateUpdate);
        }
        else{
            // stop the game 
            this.scene.events.emit(LevelMangerEvents.LevelTimeExpired);
        }
    }
    public handleTimeExpired(){
        // show menu 
        // set specific label with summary of the level 
        // show next level buttons 
    }
    public scoreChangedEventHandler(bubblePrefabOrigin:BubbleContainer){
        this.score +=bubblePrefabOrigin.scoreValue;
        this.label.textGameObject.text = "Score: "+this.score;
    }

    private setContainerConfig(container:Phaser.GameObjects.Container)
    {
        //container.setDepth(100);
        container.setPosition(0,0);
        container.setSize(this.scene.cameras.main.width,this.scene.cameras.main.height);
        console.log(container);
        const graphics = this.scene.add.graphics();
        
        graphics.lineStyle(2, 0xffff00, 1);
        //  32px radius on the corners
        graphics.strokeRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
        //  BG
        graphics.fillStyle(0xFDB813);
        graphics.fillRect(2, 2, this.scene.cameras.main.width-4, this.scene.cameras.main.height-4);
        graphics.closePath();
        
        
        container.add(graphics);

        const muteButtonLabel = new TextButton(this.scene,0,0,'Mute Sound',()=>{
            console.log("in game menu Button pressed");
        });
        
        muteButtonLabel.textGameObject
            .setDepth(200)
            .setOrigin(0.5,0.5)
            .setPosition(this.scene.cameras.main.width/2,
                this.scene.cameras.main.height/2-10)

        container.add(muteButtonLabel.textGameObject);        

        const quitGame = new TextButton(this.scene,0,0,'Quit game',()=>{
            console.log("Quit game in game menu button pressed");
        });

        quitGame.textGameObject.setDepth(-200).setOrigin(0.5,0.5);
        container.add(quitGame.textGameObject);
        Display.Align.To.BottomCenter(quitGame.textGameObject,muteButtonLabel.textGameObject,0,10);
    }

}
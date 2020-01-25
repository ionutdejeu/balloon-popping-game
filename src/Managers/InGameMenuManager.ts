import Phaser, { Display } from "phaser";
import { ProgressBar } from "../Controls/ProgressBar";
import { BubbleContainer } from "../Prefabs/BubbleContainer";
import TextLabel from "../Controls/TextLabelControl";
import TextButton from "../Controls/TextButton";
import { LevelMangerEvents } from "./LevelManager";
import ButtonPannel from "../Controls/ButtonPannel";
import { LevelDefinition } from "./LevelDefinitions";


export function LevelSummaryTimeExpired(points:number){
    return 'Level completed. Total: '+points;
}
export function LevelSummaryGameOver(){
    return 'Level over.'
}
export function LevelSummary(levelNumber:string){
    return ' Level'+levelNumber+' '; 
}
 
export class InGameMenuManager {
    
    levelTimeProgressBar:ProgressBar;
    public levelTimer:Phaser.Time.TimerEvent;
    score: number;
    label:TextLabel;
    levelTimeLable:TextLabel;
    public gameIsPaused:boolean=false;
    public musicMute:boolean=false;
    public actionButton:TextButton;
    public nextLevelButton:TextButton;
    public textSummary:TextButton;

    public actionButtonLabels = {
        resume:'Resume game',
        retry:'Restart level',
        next:'Next Level'
    }

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

    constructor(
            public scene:Phaser.Scene,
            public definition:LevelDefinition
        ){
        
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
               this.toggleGamePause();
            });
        this.scene.events.on(LevelMangerEvents.LevelGameOver,this.handleGameOverEvent,this);
        this.scene.events.on(LevelMangerEvents.LevelRestart,this.restart,this);
        this.scene.events.on(LevelMangerEvents.LevelObjectDistroyed,(prefab:BubbleContainer)=>{
            this.scoreChangedEventHandler(prefab);
        });
            
    }
    public loadLevel(definition:LevelDefinition){
        this.definition = definition;
        this.levelTimeProgressBar.setValue(definition.timeAvailableInSec);
    }
    public handleGameOverEvent(){
        this.actionButton.textGameObject.text = this.actionButtonLabels.retry;
        this.toggleGamePause();
        // show menu 
        this.nextLevelButton.textGameObject.setActive(false);
    }
    public toggleGamePause(){
        this.gameIsPaused = !this.gameIsPaused;
        this.inGameMenuContainer.setVisible(this.gameIsPaused);
        this.levelTimer.paused=this.gameIsPaused;
        this.scene.events.emit(LevelMangerEvents.MenuButtonPressed,this.gameIsPaused);
    }
    public restart(){
        this.score = 0;
        this.label.textGameObject.text = "Score: "+this.score;
        this.levelTimeProgressBar.setValue(this.definition.timeAvailableInSec);
    }
    updateTimer(){
        
        if(!this.levelTimeProgressBar.decrease(1)){
            // trigger the event for this scene
            this.levelTimeLable.textGameObject.text = "Remaining time: "+this.levelTimeProgressBar.value;
            this.scene.events.emit(LevelMangerEvents.LevelStateUpdate);
        }
        else{
            // stop the game 
            this.handleTimeExpired();
            this.scene.events.emit(LevelMangerEvents.LevelTimeExpired);
        }
    }
    public handleTimeExpired(){
        
        this.actionButton.textGameObject.text = this.actionButtonLabels.retry;
        // set specific label with summary of the level 
        this.toggleGamePause();
    
        // show menu 
        this.nextLevelButton.textGameObject.setActive(true);
        
    }
    public actionButtonHandler(){
        if(this.actionButton.textGameObject.text==this.actionButtonLabels.retry){
            this.scene.events.emit(LevelMangerEvents.LevelRestart);
        }
        else{
            
        }
        this.toggleGamePause();
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
        const graphics = this.scene.add.graphics();
        
        
        //  BG
        graphics.fillStyle(0xFDB813);
        graphics.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
        graphics.closePath();
        
        container.add(graphics);
        
       

        this.actionButton = new TextButton(this.scene,0,0,this.actionButtonLabels.resume,()=>{
           this.actionButtonHandler();
        });
        
        this.actionButton.textGameObject
        .setDepth(200)
        .setOrigin(0.5,0.5)
        .setPosition(this.scene.cameras.main.width/2,
            this.scene.cameras.main.height/2-10)
        container.add(this.actionButton.textGameObject);        
        
        this.textSummary = new TextButton(this.scene,0,0,LevelSummary('1'),()=>{
            console.log("Text Summary");
        });

        this.textSummary.textGameObject
        .setDepth(200)
        .setOrigin(0.5,0.5);
        container.add(this.textSummary.textGameObject);
        Display.Align.To.TopCenter(this.textSummary.textGameObject,this.actionButton.textGameObject,0,20);

        this.nextLevelButton = this.makeAnotherButtonUnderneath('Next Level',
        ()=>{
            console.log("TO DO: Implement Next Level");
        },container,
        this.actionButton.textGameObject);
        this.nextLevelButton.textGameObject.setActive(false);

        const muteSoundTxtBtn:TextButton = this.makeAnotherButtonUnderneath('Mute Sound',
        ()=>{
            this.musicMute=!this.musicMute;
            this.scene.events.emit(LevelMangerEvents.MenuOptionsMusicButtonePressed,this.musicMute);
        },container,
        this.nextLevelButton.textGameObject);
        
        const quitGameTxtBtn:TextButton = this.makeAnotherButtonUnderneath('Quite game',
        ()=>{
            console.log("quitButtonCallback button",this);
            if (window.navigator['app']) {
                window.navigator['app'].exitApp();
            } else if (window.navigator['device']) {
                window.navigator['device'].exitApp();
            } else {
                window.close();
            }
        },container,
        muteSoundTxtBtn.textGameObject);
        

    }

    private makeAnotherButtonUnderneath(
        label:string,
        callback:()=>void,
        container:Phaser.GameObjects.Container,
        toPositionUnder:Phaser.GameObjects.GameObject):TextButton{
        const newButton = new TextButton(this.scene,0,0,label,callback);
        
        newButton.textGameObject
            .setDepth(200)
            .setOrigin(0.5,0.5);
        
        Display.Align.To.BottomCenter(newButton.textGameObject,toPositionUnder,0,25);
        container.add(newButton.textGameObject);        
        return newButton;
    }

}
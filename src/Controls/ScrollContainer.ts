import Phaser from "phaser";

export class ScrollContainer extends Phaser.GameObjects.Container{
    rectangles:any[];
    startX:number;
    dragging:boolean=false;

    constructor(
        public scene:Phaser.Scene,
        public area:Phaser.Geom.Rectangle,
        children?:Phaser.GameObjects.GameObject[]
    ) 
    {
        super(scene, 0, 0,children);
        const posX:number=0;
        const posY:number=0;
        this.setPosition(area.centerX,area.centerY);

        
        this.on('drag',(event:any)=>{
            
        });
        
    }
     
    beginMove(){
        
    }
    endMove(){
        
    }
    public create(){
        this.rectangles = [];
        var initX = 50;
        var g2 = this.scene.add.grid(300, 340, 512, 256, 64, 64, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        this.add(g2);
        this.scene.input.setDraggable(g2);

        const maskGraphics = this.scene.make.graphics({},false);
        
        maskGraphics.beginPath();
        
        maskGraphics.fillStyle(0xFDB813);
        maskGraphics.fillRect(
            this.area.x, 
            this.area.y, 
            this.area.width, 
            this.area.height);
        maskGraphics.closePath();

        this.mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskGraphics);
    }
}
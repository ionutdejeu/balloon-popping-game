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

    
        this.scene.add.existing(this);
        this.create();
        
    }
     
    beginMove(){
        
    }
    endMove(){
        
    }
    public create(){
        this.rectangles = [];
        let initX = 50;
        const g2 = this.scene.add.grid(0, 0, 512, 256, 64, 64, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        g2.setInteractive();
        this.scene.input.setDraggable(g2);
        this.add(g2);
        
        var image = this.scene.add.sprite(0, 0, 'bubble').setInteractive();
        this.scene.input.setDraggable(image);
        this.add(image);
        image.on('pointerover', function () {
            image.setTint(0x44ff44);
        });
    
        image.on('pointerout', function () {
            image.clearTint();
        });
    
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
        
        const maskGraphics = this.scene.make.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0xFDB813,
                alpha: 1
            },
            add: false
        });
        
        maskGraphics.beginPath();
        maskGraphics.fillRect(
            this.area.x, 
            this.area.y, 
            this.area.width, 
            this.area.height);
        maskGraphics.closePath();
        //this.add(maskGraphics);
        this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, maskGraphics);
    }
    
    createRectangle(x:number, y:number, w:number, h:number){
        var rectangle = {};
        rectangle['sprite'] = this.scene.add.graphics({
            x:x,
            y:y
        }); 
        rectangle['sprite'].beginFill(Phaser.Display.Color.RandomRGB(100, 255), 1);
        rectangle['sprite'].bounds = new Phaser.Geom.Rectangle(0, 0, w, h);
        rectangle['sprite'].drawRect(0, 0, w, h);
        return rectangle;
      }
}
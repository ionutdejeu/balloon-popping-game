import Phaser from "phaser";


export default class TextLabel{
    
    scene:Phaser.Scene
    public textGameObject:Phaser.GameObjects.Text;
     
    
    constructor(scene:Phaser.Scene,posX:number,posY:number,label:string){
        this.scene =scene;
        this.textGameObject = this.scene.make.text({
            x: posX,
            y: posY,
            text: label,
            origin: { x: 0.5, y: 0.5 },
            align:'center',
            color: '#fff',
            stroke: '#004AFF',
            strokeThickness: 3,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#2E85FF',
                blur: 2,
                stroke: true,
                fill: true
            },
            style: {
                font: 'bold 25px Arial',
                fill: '#2E85FF',
                wordWrap: { width: 300 },
        
            }
        });
    }   
}
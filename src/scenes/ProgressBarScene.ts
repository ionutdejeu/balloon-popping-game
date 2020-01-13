import Phaser from "phaser";

export const Constants={
  ScenKey:'ProgressBar'
}
class HealthBar {
  bar:Phaser.GameObjects.Graphics;
  x:number;
  y:number;
  value:number;
  p:number;
  constructor (scene:Phaser.Scene, x:number, y:number)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = 100;
      this.p = 76 / 100;

      this.draw();

      scene.add.existing(this.bar);
  }

  decrease (amount:number)
  {
      this.value -= amount;

      if (this.value < 0)
      {
          this.value = 0;
      }

      this.draw();

      return (this.value === 0);
  }
  setValue(amount:number){
    this.value = amount;
    this.draw();
    return (this.value === 0);
  }

  draw ()
  {
      this.bar.clear();

      //  BG
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16);

      //  Health

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

      this.bar.fillStyle(0xff0000);
      if (this.value < 30)
      {
          this.bar.fillStyle(0xff0000);
      }
      else
      {
          this.bar.fillStyle(0x00ff00);
      }

      let d = Math.floor(this.p * this.value);

      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }

}

class CircularHealthBar{ 
  bar:Phaser.GameObjects.Graphics;
  x:number;
  y:number;
  value:number;
  p:number;
  constructor (scene:Phaser.Scene, x:number, y:number)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = 100;
      this.p = 360 / 100;

      this.draw();

      scene.add.existing(this.bar);
  }

  decrease (amount:number)
  {
      this.value -= amount;

      if (this.value < 0)
      {
          this.value = 0;
      }

      this.draw();

      return (this.value === 0);
  }
  setValue(amount:number){
    this.value = amount;
    this.draw();
    return (this.value === 0);
  }

  draw ()
  {
      this.bar.clear();
      let d = Math.floor(this.p * this.value);
      // // BG
      // this.bar.lineStyle(2, 0xffffff);
      // this.bar.beginPath();
      // this.bar.arc(this.x, this.y, 52, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.02);
      // this.bar.strokePath();
      // this.bar.closePath();

      // Health
      this.bar.beginPath();
      if (this.value < 30)
      {
          this.bar.fillStyle(0xff0000);
          this.bar.lineStyle(20, 0xff0000);
      }
      else
      {
          this.bar.fillStyle(0x00ff00);
          this.bar.lineStyle(20, 0x00ff00);
      }  
      this.bar.arc(this.x, this.y, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(d), true, 0.02);
      this.bar.strokePath();
      this.bar.closePath();

      
  }

}

export class ProgressBarScene extends Phaser.Scene {

  levelRemainingTime:Phaser.Time.TimerEvent; 

  constructor() {
    super({ key:Constants.ScenKey  });
  }
  preload():void{
    this.load.image('spark', 'assets/images/blue.png');
  }
  create(): void {
    this.levelRemainingTime = this.time.addEvent({ delay: 1000, 
      callback: ()=>{

      }, 
      callbackScope: this, 
      loop: true });
    
    let button = this.add.graphics();
      
    button.fillStyle(0xdadada, 1); // color, alpha
    button.fillRoundedRect(0, 0, 100, 100, 12); // x, y, width, height, radius
    button.lineStyle(3, 0x6a7901, 1); // lineWidth, color, alpha
    button.strokeRoundedRect(3, 3, 94, 94, 10); // x, y, width, height, radius
    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 100), Phaser.Geom.Rectangle.Contains);
    button.input.cursor = "pointer";
    button.name = "button_test";
    button.x = 100;
    button.y = 100;

    //CREATE A BORDER ON TOP OF BUTTON
    let border = this.add.graphics();
    border.lineStyle(3, 0xffffff, 1);
    border.strokeRoundedRect(3, 3, 94, 94, 10);
    border.x = 100;
    border.y = 100;
    border.alpha = 0;
    this.add.particles

   //YOYO EFFECT ON BORDER
   let tween = this.tweens.add({
      targets: border,
      duration: 1000,
      delay: 500,
      alpha: 1,
      repeat: -1,
      yoyo: true
  });
  var tweenObject = {
    val: 1
  };
  const hp = new HealthBar(this, 100, 200);
  const hp2 = new CircularHealthBar(this,100,400);
  this.tweens.add({
      targets: tweenObject,
      val: 0,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      callbackScope: this,
      onUpdate: function(tween, target){
        //console.log(target['val']*100);
        hp.setValue(Math.round(target['val']*100));
        hp2.setValue(Math.round(target['val']*100));
      }
  });
    let emitter = this.add.particles('spark').createEmitter({
      x: 100,
      y: 400,
      blendMode: 'SCREEN',
      scale: { start: 0.2, end: 0 },
      speed: { min: -100, max: 100 },
      quantity: 10
    });
    emitter.setEmitZone({
      source: new Phaser.Geom.Circle(0, 0, 50),
      type: 'edge',
      quantity: 10
    });
    //emitter.explode(50,500,500);
    
    
  }
  dummyFunction(){
    var graphics = this.add.graphics();

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
}

//See my plugin for Phaser :) https://jdnichollsc.github.io/Phaser-Kinetic-Scrolling-Plugin/

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
    init: function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.maxWidth = 1024;//1024;
      this.scale.maxHeight = 768;//768;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    },
    preload: function(){
      this.game.stage.backgroundColor = '#FFF';
    },
    create: function(){
      
      this.rectangles = [];
      
      var initX = 50;
      
      for(var i = 0; i< 26; i++){
        this.rectangles.push(this.createRectangle(initX, this.game.world.centerY - 200, 250, 400, i));
        this.index = this.game.add.text(initX +125, this.game.world.centerY, i + 1,
              { font: 'bold 150px Arial', align: "center" });
            this.index.anchor.set(0.5);
        initX += 300;
      }    
      
      this.game.world.setBounds(0, 0, 320 * this.rectangles.length, this.game.height);
          
      this.positionX = this.game.add.text(0,0, 'Mouse/Touch x',
      {
        font: 'bold 50px "Arial"',
        align: 'center'
      });
      this.positionX.anchor.set(0.5);
      this.positionX.fixedToCamera = true;
      this.positionX.cameraOffset.setTo(this.game.width/2,70);
      
      this.cameraX = this.game.add.text(0,0, 'Camera x',
      {
        font: 'bold 50px "Arial"',
        align: 'center'
      });
      this.cameraX.anchor.set(0.5);
      this.cameraX.fixedToCamera = true;
      this.cameraX.cameraOffset.setTo(this.game.width/2,this.game.height - 80);
      
      this.dragging = false;
      this.autoScroll = false;
      this.timeConstant = 325; //really mimic iOS
      this.game.input.onDown.add(this.beginMove, this);
      this.game.input.onUp.add(this.endMove, this);    
      this.game.input.addMoveCallback(this.moveCamera, this);
    },
    update: function(){
      this.cameraX.setText("Camera x:" + this.game.camera.x.toFixed(2));
      if(this.autoScroll && this.amplitude != 0){
        this.elapsed = Date.now() - this.timestamp;
        var delta = -this.amplitude * Math.exp(-this.elapsed / this.timeConstant);
        if ((delta > 0.5 || delta < -0.5)) {
          this.game.camera.x = this.target - delta;
          this.autoScroll = true;
        } 
        else {
          this.autoScroll = false;
          this.game.camera.x = this.target;
        }
      }
    },
    beginMove: function(){
      this.startX = this.game.input.x;
      this.dragging = true;
      this.timestamp = Date.now();
      this.velocity = this.amplitude = 0;
    },
    endMove: function(){
      this.dragging = false;
      this.autoScroll = false;
      if (this.game.input.activePointer.withinGame && (this.velocity > 10 || this.velocity < -10)) {
          this.amplitude = 0.8 * this.velocity;
          this.now = Date.now(); 
          this.target = Math.round(this.game.camera.x - this.amplitude);
          this.autoScroll = true;
      }
      if(!this.game.input.activePointer.withinGame){
         this.autoScroll = true;
      }
      console.log(this.velocity);
    },
    moveCamera: function(pointer, x, y){
      
      if(this.dragging){
        var delta = x - this.startX; //Compute move distance
        this.startX = x;
        this.now = Date.now();
        var elapsed = this.now - this.timestamp;
        this.timestamp = this.now;
        
        var v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
        
        this.game.camera.x -= delta;
        this.positionX.setText("Mouse/Touch x:" + x.toFixed(2));
      }
    },
    createRectangle: function(x, y, w, h){
      var rectangle = {};
      rectangle.sprite = game.add.graphics(x, y); 
      rectangle.sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
      rectangle.sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
      rectangle.sprite.drawRect(0, 0, w, h);
      return rectangle;
    }
  });
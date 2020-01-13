import Phaser from "phaser";
import {InfoScene, Info_Constants } from "./Scenes/InfoScene";
import {MainMenu, MainMenu_Constants } from "./Scenes/MainMenu";
import {MainLevelScene, MainLevel_Constants} from "./Scenes/MainLevelScene";
import { ProgressBarScene,Constants as ProgressParConstants } from "./Scenes/ProgressBarScene";
import { InGameMenuScene } from "./Scenes/InGameMenuScene";

export function initialize() {
    document.addEventListener('deviceready', onDeviceReady, false);
}
export let game:Phaser.Game;
export let previousActiveSceneKey:string;
function onDeviceReady() {
    // Handle the Cordova pause and resume events
    previousActiveSceneKey = '';
    document.addEventListener('pause', onPause, false);
    document.addEventListener('resume', onResume, false);

    // Initialize the game 
    game = new Phaser.Game({
      type: Phaser.WEBGL,
      // TODO: OnResize
      width: window.innerWidth,
      height: window.innerHeight,
      render: { pixelArt: true },
      physics: { default: "arcade", arcade: { debug: true, gravity: { y: 0 } } },
      scene: [MainLevelScene,MainMenu,InGameMenuScene,InfoScene,ProgressBarScene]
    });
    
    setUpHotReload();
    window.addEventListener("resize", () => {
      //game.resize(window.innerWidth, window.innerHeight);
    });
} 
 
function onPause() {
    // TODO: This application has been suspended. Save application state here.
    if( game.scene.isActive(MainLevel_Constants.ScenKey)) previousActiveSceneKey=MainLevel_Constants.ScenKey;
    if( game.scene.isActive(MainMenu_Constants.ScenKey)) previousActiveSceneKey=MainLevel_Constants.ScenKey;
    if( game.scene.isActive(Info_Constants.ScenKey)) previousActiveSceneKey=MainLevel_Constants.ScenKey;
    game.scene.pause(previousActiveSceneKey);
}

function onResume() {
    game.scene.resume(previousActiveSceneKey);
    
}

function setUpHotReload() {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {});
    // @ts-ignore
    module.hot.dispose(() => {
      window.location.reload();
    });
  }
}

initialize();
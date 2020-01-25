import { BubbleContainer, StandardBubbleTapBehaviour } from "../Prefabs/BubbleContainer";

export interface LevelDefinition {
    levelNumber:number,
    bubbleCount:number,
    lifeCount:number,
    timeAvailableInSec:number,
    bubbleType:any,
    bubbleTapBehavior:Array<any>,
    bubbleSpawnMax:number,
    bubbleSpawnRateInMillis:number,
    bubbleMinSizeXY:number,
    bubbleMaxSizeXY:number,
    bubbleMinSpeed:number,
    bubbleMaxSpeed:number
}
export const Level1Definition:LevelDefinition = {
    levelNumber:1,
    bubbleCount:12,
    lifeCount:1,//instakill,
    timeAvailableInSec:60,
    bubbleType:typeof(BubbleContainer),
    bubbleTapBehavior:[typeof(StandardBubbleTapBehaviour)],
    bubbleSpawnMax:20,
    bubbleSpawnRateInMillis:1000,
    bubbleMinSizeXY:50,
    bubbleMaxSizeXY:100,
    bubbleMinSpeed:-200,
    bubbleMaxSpeed:-100
}
export const Level2Definition:LevelDefinition = { 
    levelNumber:2,
    bubbleCount:30,
    lifeCount:1,//instakill,
    timeAvailableInSec:60,
    bubbleType:typeof(BubbleContainer),
    bubbleTapBehavior:[typeof(StandardBubbleTapBehaviour)],
    bubbleSpawnMax:20,
    bubbleSpawnRateInMillis:1000,
    bubbleMinSizeXY:50,
    bubbleMaxSizeXY:100,
    bubbleMinSpeed:-200,
    bubbleMaxSpeed:-100
}
 

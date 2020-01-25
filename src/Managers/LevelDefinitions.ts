import { BubbleContainer, StandardBubbleTapBehaviour } from "../Prefabs/BubbleContainer";

export const Level1Definition = { 
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
 

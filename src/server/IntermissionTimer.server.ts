// import { GameEvents } from "shared/gameEvents";
// import Remotes from "shared/remotes";

// let currentTime = 10;
// let isRunning = true;
// GameEvents.OnSecondPassed.Event.Connect(() => {
// 	if (!isRunning) {
// 		return;
// 	}
// 	currentTime -= 1;
// 	//print("time " + currentTime);
// 	Remotes.Server.Get("UpdateIntermissionUI").SendToAllPlayers(currentTime);

// 	if (currentTime <= 0) {
// 		GameEvents.OnIntermissionTimerFinished.Fire();
// 		isRunning = false;
// 	}
// });

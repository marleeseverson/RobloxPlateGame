import { RunService } from "@rbxts/services";
import { GameEvents } from "shared/gameEvents";
let timePassed = 0;

RunService.Heartbeat.Connect((dt: number) => {
	timePassed += dt;
	if (timePassed >= 1) {
		GameEvents.OnSecondPassed.Fire();
		timePassed = 0;
	}
});

GameEvents.OnIntermissionTimerFinished.Event.Connect(() => {
	//print("Event fired");
});

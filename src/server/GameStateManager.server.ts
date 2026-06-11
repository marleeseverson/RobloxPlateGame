import { GameStateMachine } from "shared/GameState/GameStateMachine";
import { RunService } from "@rbxts/services";
import { BaseGameState } from "shared/GameState/BaseGameState";
import { IntermissionGameState } from "shared/GameState/IntermissionGameState";
import { InRoundGameState } from "shared/GameState/InRoundGameState";
import { GameEvents } from "shared/gameEvents";

const stateMachine = new GameStateMachine();

function intermissionEntered() {
	//print("Intermission entered");
}

function inRoundEntered() {
	print("In round entered");
	GameEvents.OnInRoundStateEntered.Fire();
}

intermissionEntered();

stateMachine.OnGameStateChanged.Connect((newState: BaseGameState) => {
	if (newState instanceof IntermissionGameState) {
		intermissionEntered();
	} else if (newState instanceof InRoundGameState) {
		inRoundEntered();
	}
});

RunService.Heartbeat.Connect((dt: number) => {
	stateMachine.update(dt);
});

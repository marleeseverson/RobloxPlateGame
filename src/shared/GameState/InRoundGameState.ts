import { BaseGameState } from "./BaseGameState";
import { GameStateType } from "./GameStateType";
import type { GameStateMachine } from "./GameStateMachine";
import { playingTeam } from "shared/teams";
import { Players } from "@rbxts/services";
import Remotes from "shared/remotes";

export class InRoundGameState extends BaseGameState {
	private timePassedInState: number;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.timePassedInState = 0;
	}

	onEnter(): void {
		//print("In Round Entered");
	}
	onUpdate(dt: number): void {
		this.timePassedInState += dt;
	}
	getNextState(): BaseGameState {
		const numPlayersLeft = playingTeam.GetPlayers().size();
		print("num players left : " + numPlayersLeft);
		if (numPlayersLeft === 1) {
			const playerName = playingTeam.GetPlayers()[0].Name;
			Remotes.Server.Get("OnPlayerWin").SendToAllPlayers(playerName);
			return this.stateMachine.getRoundOverState();
		}
		return this.stateMachine.getInRoundState();
	}
	onExit(): void {
		//
	}
	getType(): GameStateType {
		return GameStateType.Playing;
	}
}

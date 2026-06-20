import { BaseGameState } from "./BaseGameState";
import { GameStateType } from "./GameStateType";
import type { GameStateMachine } from "./GameStateMachine";
import { playingTeam } from "shared/teams";
import { Players } from "@rbxts/services";
import Remotes from "shared/remotes";
import ToolService from "shared/ToolService/ToolService";
import { ToolType } from "shared/ToolService/ToolType";

export class InRoundGameState extends BaseGameState {
	private timePassedInState: number;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.timePassedInState = 0;
	}

	onEnter(): void {
		//print("In Round Entered");
		print("Giving tools");
		for (const player of Players.GetPlayers()) {
			ToolService.givePlayerTool(player, ToolType.Sword);
		}
	}
	onUpdate(dt: number): void {
		this.timePassedInState += dt;
	}
	getNextState(): BaseGameState {
		const numPlayersLeft = playingTeam.GetPlayers().size();
		//print("num players left : " + numPlayersLeft);
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

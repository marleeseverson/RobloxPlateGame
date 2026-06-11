import { Players } from "@rbxts/services";
import { BaseGameState } from "./BaseGameState";
import { GameStateMachine, GameStateType } from "./GameStateMachine";

export class WaitingForPlayersGameState extends BaseGameState {
	private timePassedInState: number;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.timePassedInState = 0;
	}

	onEnter(): void {
		print("Waiting for players eneters");
	}
	onUpdate(dt: number): void {
		this.timePassedInState += dt;
	}
	getNextState(): BaseGameState {
		if (Players.GetPlayers().size() > 1) {
			return this.stateMachine.getIntermissionGameState();
		}
		return this.stateMachine.getWaitingForPlayersGameState();
	}
	onExit(): void {
		//
	}
	getType(): GameStateType {
		return GameStateType.WaitingForMorePlayers;
	}
}

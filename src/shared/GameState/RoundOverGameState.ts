import { Players } from "@rbxts/services";
import { BaseGameState } from "./BaseGameState";
import { GameStateMachine, GameStateType } from "./GameStateMachine";

export class RoundOverGameState extends BaseGameState {
	private timePassedInState: number;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.timePassedInState = 0;
	}

	onEnter(): void {
		print("Round Over");
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
		return GameStateType.RoundOver;
	}
}

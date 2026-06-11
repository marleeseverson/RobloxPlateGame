import { Players } from "@rbxts/services";
import { BaseGameState } from "./BaseGameState";
import type { GameStateMachine } from "./GameStateMachine";
import { GameStateType } from "./GameStateType";

export class RoundOverGameState extends BaseGameState {
	private roundEndTimer = 5;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
	}

	onEnter(): void {
		print("Round Over");
		this.roundEndTimer = 5;
	}
	onUpdate(dt: number): void {
		this.roundEndTimer -= dt;
		print("Round end timer : " + this.roundEndTimer);
	}
	getNextState(): BaseGameState {
		if (this.roundEndTimer <= 0) {
			print("Waiting for players after round ended");
			return this.stateMachine.getWaitingForPlayersGameState();
		}
		return this.stateMachine.getRoundOverState();
	}
	onExit(): void {
		//
	}
	getType(): GameStateType {
		return GameStateType.RoundOver;
	}
}

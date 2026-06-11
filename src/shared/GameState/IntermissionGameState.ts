import { BaseGameState } from "./BaseGameState";
import { GameStateType } from "./GameStateType";

import type { GameStateMachine } from "./GameStateMachine";
import { GameEvents } from "shared/gameEvents";
import Remotes from "shared/remotes";

export class IntermissionGameState extends BaseGameState {
	private intermissionTime: number;
	private timeLeft: number;
	private isActive: boolean;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.intermissionTime = stateMachine.getIntermissionTime();
		this.timeLeft = 5;
		this.isActive = false;

		GameEvents.OnSecondPassed.Event.Connect(() => {
			this.timeLeft -= 1;
			Remotes.Server.Get("UpdateIntermissionUI").SendToAllPlayers(this.timeLeft);
		});
	}

	onEnter(): void {
		//print("Intermission Entered");
		this.intermissionTime = this.stateMachine.getIntermissionTime();
		this.timeLeft = 5;
		this.isActive = true;
	}
	onUpdate(dt: number): void {}
	getNextState(): BaseGameState {
		if (this.timeLeft <= 0) {
			return this.stateMachine.getInRoundState();
		}
		return this.stateMachine.getIntermissionGameState();
	}
	onExit(): void {
		this.isActive = false;
	}
	getType(): GameStateType {
		return GameStateType.Intermission;
	}
}

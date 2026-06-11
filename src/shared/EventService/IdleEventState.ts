import { GameStateType } from "shared/GameState/GameStateType";
import { BaseEventState } from "./BaseEventState";
import type { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";
import { Signals } from "shared/signals";

export class IdleEventState extends BaseEventState {
	private isActive;
	constructor(stateMachine: EventStateMachine) {
		super(stateMachine);
		this.isActive = false;
		Signals.OnGameStateChanged.Connect((newGameStateType) => {
			if (newGameStateType === GameStateType.Playing) {
				this.isActive = true;
			}
		});
	}

	onEnter(): void {
		print("Idle event entered");
		this.isActive = false;
	}
	onUpdate(dt: number): void {
		//
	}
	getNextState(): BaseEventState {
		if (this.isActive) {
			return this.stateMachine.getCountdownEventState();
		}
		return this.stateMachine.getIdleEventState();
	}
	onExit(): void {
		//
	}
	//
	getStateType(): EventStateType {
		return EventStateType.Idle;
	}
}

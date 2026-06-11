import { GameStateType } from "shared/GameState/GameStateType";
import { BaseEventState } from "./BaseEventState";
import type { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";
import { Signals } from "shared/signals";

export class WaitingEventState extends BaseEventState {
	constructor(stateMachine: EventStateMachine) {
		super(stateMachine);
	}

	onEnter(): void {
		print("Waiting event entered");
	}
	onUpdate(dt: number): void {
		//
	}
	getNextState(): BaseEventState {
		return this.stateMachine.getWaitingEventState();
	}
	onExit(): void {
		//
	}
	//
	getStateType(): EventStateType {
		return EventStateType.Waiting;
	}
}

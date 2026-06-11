import { GameStateType } from "shared/GameState/GameStateMachine";
import { BaseEventState } from "./BaseEventState";
import type { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";
import { Signals } from "shared/signals";

export class FiringEventState extends BaseEventState {
	private baseFiringTime = 0.5;
	private timePassed = 0;
	private targetIndex = 0;
	private doneFiring = false;
	constructor(stateMachine: EventStateMachine) {
		super(stateMachine);
	}

	onEnter(): void {
		this.doneFiring = false;
		this.targetIndex = 0;
	}
	onUpdate(dt: number): void {
		this.timePassed += dt;
		if (this.timePassed >= this.baseFiringTime) {
			const event = this.stateMachine.getCurrentEvent();
			const targetPlate = this.stateMachine.getCurrentTargets()[this.targetIndex];
			this.timePassed = 0;
			event.triggerPlateEvent(targetPlate);
			this.targetIndex++;
			if (this.stateMachine.getCurrentTargets().size() <= this.targetIndex) {
				this.doneFiring = true;
			}
		}
	}
	getNextState(): BaseEventState {
		if (this.doneFiring === true) {
			return this.stateMachine.getCountdownEventState();
		}
		return this.stateMachine.getFiringEventState();
	}
	onExit(): void {
		//
	}
	//
	getStateType(): EventStateType {
		return EventStateType.Firing;
	}
}

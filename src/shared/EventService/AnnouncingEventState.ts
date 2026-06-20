import { Signals } from "shared/signals";
import { BaseEventState } from "./BaseEventState";
import type { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";
import { BaseEvent } from "shared/Events/BaseEvent";
import { Plate } from "shared/plate";
import Remotes from "shared/remotes";

export class AnnouncingEventState extends BaseEventState {
	private annouceTime = 2;
	constructor(stateMachine: EventStateMachine) {
		super(stateMachine);

		//Signals.RequestRandomEvent.Fire()
	}

	onEnter(): void {
		print("Announce Event State entered");
		Remotes.Server.Get("OnPlateEventsFinalized").SendToAllPlayers(
			this.stateMachine.getPlateModels(),
			this.stateMachine.getCurrentPlayerTargets(),
			this.stateMachine.getCurrentEvent().getType(),
		);
		this.annouceTime = 2;
	}
	onUpdate(dt: number): void {
		this.annouceTime -= dt;
	}
	getNextState(): BaseEventState {
		if (this.annouceTime <= 0) {
			return this.stateMachine.getFiringEventState();
		}
		return this.stateMachine.getAnnouncingEventState();
	}
	onExit(): void {}
	//
	getStateType(): EventStateType {
		return EventStateType.Announcing;
	}
}

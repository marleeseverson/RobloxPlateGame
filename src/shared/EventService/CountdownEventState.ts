import { GameStateType } from "shared/GameState/GameStateType";
import { BaseEventState } from "./BaseEventState";
import type { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";
import { Signals } from "shared/signals";
import Remotes from "shared/remotes";
import { BaseEvent } from "shared/Events/BaseEvent";

export class CountdownEventState extends BaseEventState {
	private countdown = 3;
	private lastRoundedTime = 0;
	constructor(stateMachine: EventStateMachine) {
		super(stateMachine);
	}

	onEnter(): void {
		print("Countdown event entered");
		this.countdown = 3;
		this.pickRandomInfo();
	}
	onUpdate(dt: number): void {
		//print("tick");
		this.countdown -= dt;
		const roundedTime = math.round(this.countdown * 10) / 10;
		if (roundedTime !== this.lastRoundedTime) {
			//print("Rounded time : " + roundedTime);
			Remotes.Server.Get("OnGameEventTimerUpdated").SendToAllPlayers(roundedTime);
			this.lastRoundedTime = roundedTime;
		}
	}
	getNextState(): BaseEventState {
		if (this.countdown <= 0) {
			return this.stateMachine.getAnnouncingEventState();
		}
		return this.stateMachine.getCountdownEventState();
	}
	onExit(): void {
		//
	}
	//
	getStateType(): EventStateType {
		return EventStateType.Countdown;
	}

	private pickRandomInfo() {
		Signals.RequestRandomEvent.Fire((event: BaseEvent) => {
			this.stateMachine.setEvent(event);
			this.getRandomTargets(event.getTargetNumber());
		});
	}
	private getRandomTargets(targetNumber: number) {
		Signals.RequestRandomPlates.Fire(targetNumber, (plates) => {
			this.stateMachine.setPlateTargets(plates);
		});
	}
}

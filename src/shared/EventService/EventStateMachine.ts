import { AnnouncingEventState } from "./AnnouncingEventState";
import { BaseEventState } from "./BaseEventState";
import { IdleEventState } from "./IdleEventState";
import Remotes from "shared/remotes";
import { Signals } from "shared/signals";
import { EventStateType } from "./EventStateType";
import { BaseEvent } from "shared/Events/BaseEvent";
import { Plate } from "shared/plate";
import { CountdownEventState } from "./CountdownEventState";
import { WaitingEventState } from "./WaitingEventState";
import { FiringEventState } from "./FiringGameState";
import { GameStateType } from "shared/GameState/GameStateType";

export class EventStateMachine {
	private currentEventState: BaseEventState;
	private idleState: IdleEventState;
	private countDownState: CountdownEventState;
	private announcingState: AnnouncingEventState;
	private firingState: FiringEventState;
	private waitingState: WaitingEventState;
	private currentEvent: BaseEvent;
	private currentPlateTargets: Plate[];
	private plateModels: Model[];

	constructor() {
		this.idleState = new IdleEventState(this);
		this.countDownState = new CountdownEventState(this);
		this.announcingState = new AnnouncingEventState(this);
		this.firingState = new FiringEventState(this);
		this.waitingState = new WaitingEventState(this);
		this.currentEventState = undefined as any;
		this.currentEvent = undefined as any;
		this.currentPlateTargets = [];
		this.plateModels = [];
		this.start();
	}

	public start(): void {
		print("start");
		this.tryTransitionToNextState(this.idleState);
		Remotes.Server.Get("OnGameEventStateChanged").SendToAllPlayers(this.getCurrentStateType());
		Signals.OnGameStateChanged.Connect((newStateType) => {
			if (newStateType === GameStateType.RoundOver) {
				print("Going to idle");
				this.tryTransitionToNextState(this.idleState);
			}
		});
	}

	public update(dt: number): void {
		if (!this.currentEventState) return;
		this.currentEventState.onUpdate(dt);
		this.tryTransitionToNextState(this.currentEventState.getNextState());
	}

	private tryTransitionToNextState(newState: BaseEventState): boolean {
		if (this.currentEventState === undefined || this.currentEventState !== newState) {
			if (this.currentEventState !== undefined) {
				this.currentEventState.onExit();
			}
			this.currentEventState = newState;
			Remotes.Server.Get("OnGameEventStateChanged").SendToAllPlayers(this.getCurrentStateType());
			Signals.OnEventStateChanged.Fire(this.getCurrentStateType());

			this.currentEventState.onEnter();
		}
		return true;
	}

	public getIdleEventState() {
		return this.idleState;
	}
	public getCountdownEventState() {
		return this.countDownState;
	}
	public getAnnouncingEventState() {
		return this.announcingState;
	}
	public getFiringEventState() {
		return this.firingState;
	}
	public getWaitingEventState() {
		return this.waitingState;
	}
	public getCurrentEvent(): BaseEvent {
		return this.currentEvent;
	}
	public getCurrentTargets(): Plate[] {
		return this.currentPlateTargets;
	}

	public setEvent(newEvent: BaseEvent) {
		this.currentEvent = newEvent;
	}
	public setPlateTargets(plateTargets: Plate[]) {
		this.currentPlateTargets = plateTargets;
		this.fireInfoSelectedEvent();
	}
	public getCurrentStateType(): EventStateType {
		return this.currentEventState.getStateType();
	}
	public fireInfoSelectedEvent() {
		if (this.currentEvent && this.currentPlateTargets) {
			Remotes.Server.Get("OnEventAndPlatesSelected").SendToAllPlayers(
				this.currentEvent.getName(),
				this.getTargetNames(),

				this.getPlateModels(),
			);
		}
	}

	public getPlateModels(): Model[] {
		const models: Model[] = [];
		for (const plate of this.getCurrentTargets()) {
			models.push(plate.getModel());
		}
		return models;
	}

	private getTargetNames(): string[] {
		const names = [] as string[];
		for (const plate of this.getCurrentTargets()) {
			names.push(plate.getPlayer().Name);
		}
		return names;
	}
}

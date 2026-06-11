import { BaseEvent, EventType } from "../Events/BaseEvent";
import { PlateShrinkEvent } from "../Events/PlateShrinkEvent";
import { RunService } from "@rbxts/services";
import { Plate } from "../plate";
import PlateService from "../PlateService";
import { Signals } from "../signals";
import { EventStateMachine } from "./EventStateMachine";
import { GameStateType } from "shared/GameState/GameStateType";
import { Events } from "./Events";

class EventService {
	private eventStateMachine: EventStateMachine;
	private events: BaseEvent[];
	private currentEvent: BaseEvent;
	private currentPlateTargets: Plate[];
	private currentGameStateType: GameStateType;

	constructor() {
		this.eventStateMachine = new EventStateMachine();
		this.currentEvent = undefined as any;
		this.events = Events;
		this.currentPlateTargets = [];
		this.currentGameStateType = GameStateType.Intermission;

		RunService.Heartbeat.Connect((dt: number) => {
			this.eventStateMachine.update(dt);
		});

		Signals.OnGameStateChanged.Connect((newStateType) => {
			this.currentGameStateType = newStateType;
		});

		Signals.RequestRandomEvent.Connect((callback) => {
			callback(this.getRandomEvent());
		});
		Signals.RequestRandomPlates.Connect((count, callback) => {
			callback(this.getRandomActivePlates(count));
		});
	}

	public getRandomActivePlates(plateCount: number): Plate[] {
		const plates: Plate[] = [];
		for (let i = 0; i < plateCount; i++) {
			const plate = PlateService.getRandomActivePlate();
			plates.push(plate);
		}
		return plates;
	}

	public getRandomEvent(): BaseEvent {
		return this.events[math.random(0, this.events.size() - 1)];
	}

	public getCurrentEvent(): BaseEvent {
		return this.currentEvent;
	}
	public setCurrentEvent(newEvent: BaseEvent) {
		this.currentEvent = newEvent;
	}

	public getCurrentGameStateType(): GameStateType {
		return this.currentGameStateType;
	}
	public init() {
		//Do nothing
	}
}

export = new EventService();

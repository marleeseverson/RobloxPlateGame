import { Plate } from "shared/plate";
export enum EventType {
	Player,
	Plate,
}

export abstract class BaseEvent {
	protected type: EventType;
	protected name: string;
	protected targetNumber: number;
	constructor(eventType: EventType, name: string, targetNumber: number) {
		this.type = eventType;
		this.name = name;
		this.targetNumber = targetNumber;
	}

	public getType(): EventType {
		return this.type;
	}
	public getName(): string {
		return this.name;
	}
	public getTargetNumber(): number {
		return this.targetNumber;
	}

	public abstract triggerPlateEvent(plates: Plate): void;
	public abstract triggerPlayerEvent(players: Player): void;
}

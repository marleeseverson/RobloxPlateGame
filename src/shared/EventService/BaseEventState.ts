import { EventStateMachine } from "./EventStateMachine";
import { EventStateType } from "./EventStateType";

export abstract class BaseEventState {
	protected name: string;
	protected stateMachine: EventStateMachine;
	abstract onEnter(): void;
	abstract onUpdate(dt: number): void;
	abstract getNextState(): BaseEventState;
	abstract onExit(): void;
	abstract getStateType(): EventStateType;

	constructor(stateMachine: EventStateMachine) {
		this.name = "";
		this.stateMachine = stateMachine;
	}
}

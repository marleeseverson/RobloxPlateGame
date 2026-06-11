import { GameStateMachine } from "./GameStateMachine";

export abstract class BaseGameState {
	protected name: string;
	protected stateMachine: GameStateMachine;
	abstract onEnter(): void;
	abstract onUpdate(dt: number): void;
	abstract getNextState(): BaseGameState;
	abstract onExit(): void;

	constructor(stateMachine: GameStateMachine) {
		this.name = "";
		this.stateMachine = stateMachine;
	}
}

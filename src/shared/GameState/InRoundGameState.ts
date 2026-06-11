import { BaseGameState } from "./BaseGameState";
import { GameStateMachine, GameStateType } from "./GameStateMachine";

export class InRoundGameState extends BaseGameState {
	private timePassedInState: number;

	constructor(stateMachine: GameStateMachine) {
		super(stateMachine);
		this.timePassedInState = 0;
	}

	onEnter(): void {
		//print("In Round Entered");
	}
	onUpdate(dt: number): void {
		this.timePassedInState += dt;
	}
	getNextState(): BaseGameState {
		return this.stateMachine.getInRoundState();
	}
	onExit(): void {
		//
	}
	getType(): GameStateType {
		return GameStateType.Playing;
	}
}

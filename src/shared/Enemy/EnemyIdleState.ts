import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

export class EnemyIdleState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private timeInState = 0;
	private idleDuration = 3; // Time in seconds before transitioning to the next state
	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Idle";
		this.currentEnemyStateMachine = enemyStateMachine;
		//print("EnemyIdleState created");
	}
	onUpdate(dt: number): void {
		//print("Updating Idle State");
		this.timeInState += dt;
	}
	onEnter(): void {
		//print("Entering Idle State");
		this.timeInState = 0;
	}

	onGetNextState(): IEnemyState {
		if (this.timeInState >= this.idleDuration) {
			print("Idle State duration complete, transitioning to next state");
			return this.currentEnemyStateMachine.getPatrolState();
		}
		return this.currentEnemyStateMachine.getIdleState();
	}
	onExit(): void {
		this.timeInState = 0;
	}
}

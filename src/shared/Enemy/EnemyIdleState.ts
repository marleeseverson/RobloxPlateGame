import { EnemyAnimationType } from "./EnemyAnimationTypes";
import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

export class EnemyIdleState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private timeInState = 0;
	private idleDuration = 5;
	private CHASE_DISTANCE = 12;
	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Idle";
		this.currentEnemyStateMachine = enemyStateMachine;
	}
	onUpdate(dt: number): void {
		//print("Updating Idle State");
		this.timeInState += dt;
	}
	onEnter(): void {
		//print("Entering Idle State");
		this.timeInState = 0;
		this.currentEnemyStateMachine.playAnimation(EnemyAnimationType.Idle);
	}

	onGetNextState(): IEnemyState {
		if (this.timeInState >= this.idleDuration) {
			print("Idle State duration complete, transitioning to next state");
			return this.currentEnemyStateMachine.getPatrolState();
		}
		const nearestPlayerDistance = this.currentEnemyStateMachine.getNearestPlayerDistance();
		if (nearestPlayerDistance <= this.CHASE_DISTANCE) {
			return this.currentEnemyStateMachine.getChaseState();
		}
		return this.currentEnemyStateMachine.getIdleState();
	}
	onExit(): void {
		this.timeInState = 0;
	}
}

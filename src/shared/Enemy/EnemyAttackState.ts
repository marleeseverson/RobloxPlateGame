import { EnemyAnimationType } from "./EnemyAnimationTypes";
import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

export class EnemyAttackState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private timeInState = 0;
	private attackDuration = 1;

	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Attack";
		this.currentEnemyStateMachine = enemyStateMachine;
	}
	onUpdate(dt: number): void {
		this.timeInState += dt;
	}
	onEnter(): void {
		this.timeInState = 0;
		this.currentEnemyStateMachine.playAnimation(EnemyAnimationType.Slash);
		print("Attack");
	}

	onGetNextState(): IEnemyState {
		print("Attack onNectState");
		if (this.timeInState >= this.attackDuration) {
			return this.currentEnemyStateMachine.getChaseState();
		}

		return this.currentEnemyStateMachine.getAttackState();
	}
	onExit(): void {
		this.timeInState = 0;
	}
}

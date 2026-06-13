import { EnemyAnimationType } from "./EnemyAnimationTypes";
import { IEnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

const PathfindingService = game.GetService("PathfindingService");
const RunService = game.GetService("RunService");

export class EnemyChaseState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private cancelled = false;
	private isMoving = false;
	private STOP_CHASING_DISTANCE = 13;
	private ATTACK_DISTANCE = 2;

	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Chase";
		this.currentEnemyStateMachine = enemyStateMachine;
	}

	onEnter(): void {
		this.cancelled = false;
		this.isMoving = false;
		this.currentEnemyStateMachine.playAnimation(EnemyAnimationType.Walk);
	}

	onExit(): void {
		this.cancelled = true;
		this.isMoving = false;
		this.currentEnemyStateMachine
			.getHumanoid()
			.MoveTo(this.currentEnemyStateMachine.getHumanoidRootPart().Position);
	}

	onUpdate(dt: number): void {
		if (!this.isMoving) {
			this.moveToTarget();
		}
	}

	onGetNextState(): IEnemyState {
		const nearestPlayerDistance = this.currentEnemyStateMachine.getNearestPlayerDistance();
		if (nearestPlayerDistance >= this.STOP_CHASING_DISTANCE) {
			return this.currentEnemyStateMachine.getIdleState();
		}

		if (nearestPlayerDistance <= this.ATTACK_DISTANCE) {
			return this.currentEnemyStateMachine.getAttackState();
		}
		return this.currentEnemyStateMachine.getChaseState();
	}

	private moveToTarget(): void {
		const target = this.currentEnemyStateMachine.getNearestPlayerRootPart();
		if (!target) return;

		const model = this.currentEnemyStateMachine.getEnemyModel();
		const humanoid = model.FindFirstChild("Humanoid") as Humanoid;
		if (humanoid) {
			const root = model.FindFirstChild("HumanoidRootPart") as BasePart;

			if (target.Position.Y - root.Position.Y > 2) {
				humanoid.Jump = true;
			}

			humanoid.MoveTo(target.Position);
		}
	}
}

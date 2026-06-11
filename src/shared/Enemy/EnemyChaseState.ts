import { IEnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

const PathfindingService = game.GetService("PathfindingService");
const RunService = game.GetService("RunService");

export class EnemyChaseState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private cancelled = false;
	private isMoving = false;

	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Chase";
		this.currentEnemyStateMachine = enemyStateMachine;
	}

	onEnter(): void {
		this.cancelled = false;
		this.isMoving = false;
	}

	onExit(): void {
		this.cancelled = true;
		this.isMoving = false;
	}

	onUpdate(dt: number): void {
		if (!this.isMoving) {
			this.moveToTarget();
		}
	}

	onGetNextState(): IEnemyState {
		return this.currentEnemyStateMachine.getChaseState();
	}

	private moveToTarget(): void {
		const target = this.currentEnemyStateMachine.getNearestPlayerRootPart();
		if (!target) return;

		const model = this.currentEnemyStateMachine.getEnemyModel();
		const humanoid = model.FindFirstChild("Humanoid") as Humanoid;
		const root = model.FindFirstChild("HumanoidRootPart") as BasePart;

		if (target.Position.Y - root.Position.Y > 2) {
			humanoid.Jump = true;
		}

		humanoid.MoveTo(target.Position);
	}
}

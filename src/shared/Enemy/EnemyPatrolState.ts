import { EnemyAnimationType } from "./EnemyAnimationTypes";
import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyStateMachine } from "./EnemyStateMachine";

const PathfindingService = game.GetService("PathfindingService");
const Players = game.GetService("Players");

const PATROL_DISTANCE_MAX = 30;
const PATROL_DISTANCE_MIN = 10;
const CHASE_DISTANCE = 12;

export class EnemyPatrolState implements IEnemyState {
	private currentEnemyStateMachine: EnemyStateMachine;
	name: string;
	private timeInState = 0;
	private patrolCancelled = false;
	private isMoving = false;
	private reachedTarget = false;
	private spawnPosition: Vector3;

	constructor(enemyStateMachine: EnemyStateMachine) {
		this.name = "Patrol";
		this.currentEnemyStateMachine = enemyStateMachine;
		const root = this.currentEnemyStateMachine.getEnemyModel().FindFirstChild("HumanoidRootPart") as BasePart;
		this.spawnPosition = root.Position;
	}
	onUpdate(dt: number): void {
		this.timeInState += dt;
		//print("Nearest player distance: " + this.currentEnemyStateMachine.getNearestPlayerDistance());
		if (!this.isMoving) {
			this.moveToRandomPoint();
		}
	}
	onEnter(): void {
		this.timeInState = 0;
		this.patrolCancelled = false;
		this.isMoving = false;
		this.reachedTarget = false;
		this.currentEnemyStateMachine.playAnimation(EnemyAnimationType.Walk);
	}

	onGetNextState(): IEnemyState {
		const nearestPlayerDistance = this.currentEnemyStateMachine.getNearestPlayerDistance();
		if (nearestPlayerDistance <= CHASE_DISTANCE) {
			return this.currentEnemyStateMachine.getChaseState();
		}

		if (this.reachedTarget) {
			return this.currentEnemyStateMachine.getIdleState();
		}
		return this.currentEnemyStateMachine.getPatrolState();
	}
	onExit(): void {
		this.timeInState = 0;
		this.isMoving = false;
		this.reachedTarget = false;
		this.patrolCancelled = true;
		//this.path.Stop();
	}

	private moveToRandomPoint() {
		const angle = math.random() * math.pi * 2;
		const radius = math.random(PATROL_DISTANCE_MIN, PATROL_DISTANCE_MAX);
		const target = this.spawnPosition.add(new Vector3(math.cos(angle) * radius, 0, math.sin(angle) * radius));

		this.isMoving = true;
		const model = this.currentEnemyStateMachine.getEnemyModel();
		const humanoid = model.FindFirstChildOfClass("Humanoid") as Humanoid;
		const root = model.FindFirstChild("HumanoidRootPart") as BasePart;
		//humanoid.MoveTo(target);

		task.spawn(() => {
			const path = PathfindingService.CreatePath({
				AgentRadius: 2,
				AgentHeight: 5,
				AgentCanJump: true,
			});
			path.ComputeAsync(root.Position, target);

			const waypoints = path.GetWaypoints();
			for (let i = 0; i < waypoints.size(); i++) {
				if (this.patrolCancelled) {
					//print("Patrol cancelled, stopping movement");
					return;
				}
				const waypoint = waypoints[i];
				if (waypoint.Action === Enum.PathWaypointAction.Jump) {
					humanoid.Jump = true;
				}
				humanoid.MoveTo(waypoint.Position);
				const reached = humanoid.MoveToFinished.Wait();
			}

			//print("Reached patrol target");
			this.reachedTarget = true;
		});
	}
}

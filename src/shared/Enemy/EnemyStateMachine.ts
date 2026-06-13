import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyIdleState } from "./EnemyIdleState";
import { EnemyPatrolState } from "./EnemyPatrolState";
import Signal = require("@rbxts/signal");
import { EnemyChaseState } from "./EnemyChaseState";
import { EnemyAnimationType } from "./EnemyAnimationTypes";
import { EnemyAttackState } from "./EnemyAttackState";

const Players = game.GetService("Players");

export class EnemyStateMachine {
	onStateChanged = new Signal<(newState: IEnemyState) => void>();
	private currentState: IEnemyState;
	private idleState: EnemyIdleState;
	private patrolState: EnemyPatrolState;
	private chaseState: EnemyChaseState;
	private attackState: EnemyAttackState;
	private enemyModel: Model;
	private currentAnimationTrack: AnimationTrack;

	constructor(enemyModel: Model) {
		this.enemyModel = enemyModel;
		this.idleState = new EnemyIdleState(this);
		this.patrolState = new EnemyPatrolState(this);
		this.chaseState = new EnemyChaseState(this);
		this.attackState = new EnemyAttackState(this);
		this.currentState = undefined as any;
		this.currentAnimationTrack = undefined as any;
		this.tryTransitionToNextState(this.idleState);
	}

	public update(dt: number): void {
		if (!this.currentState) return;
		this.currentState.onUpdate(dt);
		this.tryTransitionToNextState(this.currentState.onGetNextState());
	}

	private tryTransitionToNextState(newState: IEnemyState): boolean {
		if (this.currentState === undefined || this.currentState !== newState) {
			if (this.currentState !== undefined) {
				this.currentState.onExit();
			}
			this.currentState = newState;
			this.onStateChanged.Fire(this.currentState);
			this.enemyModel.Name = this.currentState.name;
			this.currentState.onEnter();
		}
		return true;
	}

	public getNearestPlayerDistance(): number {
		let nearestDistance = math.huge;
		for (const player of Players.GetPlayers()) {
			const character = player.Character;
			if (character) {
				const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;
				if (humanoidRootPart) {
					const distance = (this.enemyModel.FindFirstChild("HumanoidRootPart") as BasePart).Position.sub(
						humanoidRootPart.Position,
					).Magnitude;
					if (distance < nearestDistance) {
						nearestDistance = distance;
					}
				}
			}
		}
		return nearestDistance;
	}
	public getNearestPlayerRootPart(): BasePart {
		let nearestDistance = math.huge;
		let nearestRootPart: BasePart | undefined = undefined;
		for (const player of Players.GetPlayers()) {
			const character = player.Character;
			if (character) {
				const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;
				if (humanoidRootPart) {
					const enemyRootPart = this.enemyModel.FindFirstChild("HumanoidRootPart") as BasePart;
					if (enemyRootPart) {
						const distance = enemyRootPart.Position.sub(humanoidRootPart.Position).Magnitude;
						if (distance < nearestDistance) {
							nearestDistance = distance;
							nearestRootPart = humanoidRootPart;
						}
					}
				}
			}
		}
		return nearestRootPart as BasePart;
	}

	public getHumanoid(): Humanoid {
		const enemyHumanoid = this.enemyModel.FindFirstChild("Humanoid") as Humanoid;
		return enemyHumanoid;
	}
	public getHumanoidRootPart(): BasePart {
		const enemyHumanoidRoot = this.enemyModel.FindFirstChild("HumanoidRootPart") as BasePart;
		return enemyHumanoidRoot;
	}

	public getCurrentState(): IEnemyState {
		return this.currentState;
	}
	public getIdleState(): EnemyIdleState {
		return this.idleState;
	}
	public getPatrolState(): EnemyPatrolState {
		return this.patrolState;
	}
	public getChaseState(): EnemyChaseState {
		return this.chaseState;
	}
	public getAttackState(): EnemyAttackState {
		return this.attackState;
	}
	public getEnemyModel(): Model {
		return this.enemyModel;
	}

	public playAnimation(animType: EnemyAnimationType) {
		if (this.currentAnimationTrack) {
			this.currentAnimationTrack.Stop();
		}
		let id = "";
		if (animType === EnemyAnimationType.Walk) {
			id = "rbxassetid://180426354";
			//id = "rbxassetid://180435571";
		} else if (animType === EnemyAnimationType.Idle) {
			id = "rbxassetid://180435571";
		} else if (animType === EnemyAnimationType.Slash) {
			id = "rbxassetid://32659699";
		}
		const animation = new Instance("Animation") as Animation;
		animation.AnimationId = id;
		const animator = this.getHumanoid().WaitForChild("Animator") as Animator;
		const track = animator?.LoadAnimation(animation);
		this.currentAnimationTrack = track;
		track?.Play();
	}
}

import { IEnemyState, EnemyState } from "./EnemyState";
import { EnemyIdleState } from "./EnemyIdleState";
import { EnemyPatrolState } from "./EnemyPatrolState";
import Signal = require("@rbxts/signal");
import { EnemyChaseState } from "./EnemyChaseState";

const Players = game.GetService("Players");

export class EnemyStateMachine {
	onStateChanged = new Signal<(newState: IEnemyState) => void>();
	private currentState: IEnemyState;
	private idleState: EnemyIdleState;
	private patrolState: EnemyPatrolState;
	private chaseState: EnemyChaseState;
	private enemyModel: Model;

	constructor(enemyModel: Model) {
		this.enemyModel = enemyModel;
		this.idleState = new EnemyIdleState(this);
		this.patrolState = new EnemyPatrolState(this);
		this.chaseState = new EnemyChaseState(this);
		this.currentState = undefined as any;
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
					const distance = (this.enemyModel.FindFirstChild("HumanoidRootPart") as BasePart).Position.sub(
						humanoidRootPart.Position,
					).Magnitude;
					if (distance < nearestDistance) {
						nearestDistance = distance;
						nearestRootPart = humanoidRootPart;
					}
				}
			}
		}
		return nearestRootPart as BasePart;
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
	public getEnemyModel(): Model {
		return this.enemyModel;
	}
}

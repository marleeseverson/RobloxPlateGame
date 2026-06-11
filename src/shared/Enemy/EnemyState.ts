export enum EnemyState {
	Idle,
	Patrol,
	Chase,
	Attacking,
	Flee,
}

export interface IEnemyState {
	name: string;
	onEnter(): void;
	onUpdate(dt: number): void;
	onGetNextState(): IEnemyState;
	onExit(): void;
}

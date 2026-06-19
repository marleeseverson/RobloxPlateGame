import { EnemyType } from "./EnemyType";

export interface IEnemyConfig {
	speed: number;
	chaseDistance: number;
	attackRange: number;
	type: EnemyType;
	model: Model;
	humanoid: Humanoid;
}

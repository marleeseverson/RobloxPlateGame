import { EnemyType } from "./EnemyType";
import { IEnemyConfig } from "./IEnemyConfig";

export class SwordEnemy implements IEnemyConfig {
	type = EnemyType.Melee;
	model: Model;
	humanoid: Humanoid;
	speed = 5;
	chaseDistance = 10;
	attackRange = 2;

	constructor(model: Model) {
		this.model = model;
		this.humanoid = model.FindFirstChildOfClass("Humanoid")!;
		if (this.humanoid) {
			this.humanoid.WalkSpeed = this.speed;
		}
	}
}

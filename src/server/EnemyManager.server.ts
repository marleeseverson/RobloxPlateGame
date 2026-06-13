import { Signals } from "shared/signals";
import { EnemyIdleState } from "../shared/Enemy/EnemyIdleState";
import { EnemyStateMachine } from "../shared/Enemy/EnemyStateMachine";

const ServerStorage = game.GetService("ServerStorage");
const RunService = game.GetService("RunService");
const enemyPrefab = ServerStorage.WaitForChild("Enemy") as Model;
const spawnEffect = ServerStorage.WaitForChild("EnemySpawnBeam") as Model;

const enemyCount = 1;

let enemies: EnemyStateMachine[] = [];

function spawnEnemy(position: Vector3) {
	const newEnemy = enemyPrefab.Clone();
	newEnemy.Parent = game.Workspace;
	newEnemy.PivotTo(new CFrame(position));
	const enemyStateMachine = new EnemyStateMachine(newEnemy);
	enemies.push(enemyStateMachine);
}

function spawnEnemyEffect(position: Vector3): Model {
	const newEffect = spawnEffect.Clone();
	newEffect.Parent = game.Workspace;
	newEffect.PivotTo(new CFrame(position));
	return newEffect;
}

Signals.SpawnEnemy.Connect((location) => {
	if (location) {
		task.spawn(() => {
			const spawnEffectLocation = new Vector3(location.X, location.Y - 5, location.Z);
			const effect = spawnEnemyEffect(spawnEffectLocation);
			task.wait(5);
			const spawnEnemyLocation = new Vector3(location.X, location.Y + 50, location.Z);
			spawnEnemy(spawnEnemyLocation);
			effect.Destroy();
		});
	}
});

Signals.SpawnEnemy.Fire(new Vector3(0, 3, 20));

RunService.Heartbeat.Connect((dt) => {
	if (enemies) {
		for (const enemy of enemies) {
			enemy.update(dt);
		}
	}
});

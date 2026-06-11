import { EnemyIdleState } from "../shared/Enemy/EnemyIdleState";
import { EnemyStateMachine } from "../shared/Enemy/EnemyStateMachine";

const ServerStorage = game.GetService("ServerStorage");
const RunService = game.GetService("RunService");
const enemyPrefab = ServerStorage.WaitForChild("Enemy") as Model;

const enemyCount = 1;

let enemies: EnemyStateMachine[] = [];

function spawnEnemy(position: Vector3) {
	const newEnemy = enemyPrefab.Clone();
	newEnemy.Parent = game.Workspace;
	newEnemy.PivotTo(new CFrame(position));
	const enemyStateMachine = new EnemyStateMachine(newEnemy);
	enemies.push(enemyStateMachine);
}

for (let i = 0; i < enemyCount; i++) {
	//spawnEnemy(new Vector3(i * 5, 5, 0));
}

RunService.Heartbeat.Connect((dt) => {
	for (const enemy of enemies) {
		enemy.update(dt);
	}
});

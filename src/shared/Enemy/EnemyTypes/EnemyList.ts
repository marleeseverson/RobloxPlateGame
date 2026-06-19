import { ReplicatedStorage } from "@rbxts/services";
import { SwordEnemy } from "./SwordEnemy";
const swordEnemyModel = ReplicatedStorage.WaitForChild("Enemies").WaitForChild("SwordEnemy") as Model;
const swordEnemy = new SwordEnemy(swordEnemyModel);

const EnemyList = {
	swordEnemy,
};

export default EnemyList;

import EventService from "shared/EventService/EventService";
import PlateService from "shared/PlateService";
import ToolService = require("shared/ToolService/ToolService");
import { Players } from "@rbxts/services";
import { ToolType } from "shared/ToolService/ToolType";
import EnemyList from "shared/Enemy/EnemyTypes/EnemyList";

EnemyList.swordEnemy;
EventService.init();
ToolService.init();

task.spawn(() => {
	task.wait(5);
	print("Giving tools");
	for (const player of Players.GetPlayers()) {
		ToolService.givePlayerTool(player, ToolType.Sword);
		ToolService.givePlayerTool(player, ToolType.Bomb);
	}
});

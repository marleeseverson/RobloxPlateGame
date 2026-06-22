import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "../BaseEvent";
import { TweenService } from "@rbxts/services";
import ToolService from "shared/ToolService/ToolService";
import { ToolType } from "shared/ToolService/ToolType";

export class GivePlayerSword extends BaseEvent {
	constructor() {
		super(EventType.Player, "Player sword", 1);
	}

	public triggerPlateEvent(plate: Plate): void {}
	public triggerPlayerEvent(player: Player): void {
		print("Player got sword: " + player.Name);

		ToolService.givePlayerTool(player, ToolType.Sword);
	}
}

import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "../BaseEvent";
import { TweenService } from "@rbxts/services";

export class PlayerGrowEvent extends BaseEvent {
	constructor() {
		super(EventType.Player, "Player grow", 1);
	}

	public triggerPlateEvent(plate: Plate): void {}
	public triggerPlayerEvent(player: Player): void {
		print("Player : " + player.Name);
	}
}

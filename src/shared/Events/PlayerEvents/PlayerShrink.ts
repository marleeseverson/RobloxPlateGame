import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "../BaseEvent";
import { TweenService } from "@rbxts/services";

export class PlayerShrinkEvent extends BaseEvent {
	constructor() {
		super(EventType.Player, "Player shrink", 1);
	}

	public triggerPlateEvent(plate: Plate): void {}
	public triggerPlayerEvent(player: Player): void {
		print("Player : " + player.Name);
		const character = player.Character;
		if (character) {
			let scale = character.GetScale();
			scale *= 0.8;
			character.ScaleTo(scale);
		}
	}
}

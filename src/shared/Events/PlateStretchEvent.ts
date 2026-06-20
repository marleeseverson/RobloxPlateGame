import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { TweenService } from "@rbxts/services";

export class PlateStretchEvent extends BaseEvent {
	constructor() {
		super(EventType.Plate, "Plate stretch", 2);
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const primaryPart = plateModel.PrimaryPart as Part;
		if (!primaryPart) return;

		const tweenInfo = new TweenInfo(10);
		const targetSize = new Vector3(primaryPart.Size.X, primaryPart.Size.Y + 40, primaryPart.Size.Z);

		const tween = TweenService.Create(primaryPart, tweenInfo, { Size: targetSize });
		tween.Play();
	}
	public triggerPlayerEvent(players: Player): void {
		// Do nothing
	}
}

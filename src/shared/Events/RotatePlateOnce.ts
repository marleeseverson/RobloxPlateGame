import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { TweenService } from "@rbxts/services";

export class RotatePlateOnceEvent extends BaseEvent {
	constructor() {
		super(EventType.Plate, "Plate Rotate", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const primaryPart = plateModel.PrimaryPart;
		if (!primaryPart) return;

		const tweenInfo = new TweenInfo(7);
		const currentCFrame = primaryPart.CFrame;
		const targetCFrame = currentCFrame.mul(
			CFrame.Angles(math.random(0, 360), math.random(0, 360), math.random(0, 360)),
		);
		const tween = TweenService.Create(primaryPart, tweenInfo, { CFrame: targetCFrame });
		tween.Play();
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

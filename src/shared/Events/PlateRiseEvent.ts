import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { TweenService } from "@rbxts/services";

export class PlateRiseEvent extends BaseEvent {
	private studAmount: number;
	constructor(studAmount: number) {
		super(EventType.Plate, "Plate Rise", 1);
		this.studAmount = studAmount;
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const primaryPart = plateModel.PrimaryPart;
		if (!primaryPart) return;

		const tweenInfo = new TweenInfo(4);
		const targetPos = new Vector3(
			primaryPart.Position.X,
			primaryPart.Position.Y + this.studAmount,
			primaryPart.Position.Z,
		);
		const targetCFrame = new CFrame(targetPos);
		const tween = TweenService.Create(primaryPart, tweenInfo, { CFrame: targetCFrame });
		tween.Play();
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

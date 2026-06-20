import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { TweenService } from "@rbxts/services";

export class PlateShrinkEvent extends BaseEvent {
	private studAmount: number;
	constructor(studAmount: number) {
		super(EventType.Plate, "Plate shrink", 2);
		this.studAmount = studAmount;
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const part = plateModel.PrimaryPart as Part;
		if (!part) {
			return;
		}
		const originalScale = plate.getOriginalScale();
		const currentSize = originalScale * plate.getScale();
		const newScale = (currentSize - this.studAmount) / plate.getOriginalScale();

		if (newScale < 0) {
			plate.setScale(0.0001);
			plateModel.ScaleTo(0.00001);
			return;
		}

		plate.setScale(newScale);

		const tweenInfo = new TweenInfo(2);
		print("New scale " + newScale);
		const targetSize = new Vector3(newScale * originalScale, part.Size.Y, newScale * originalScale);
		print("Target Size " + targetSize);

		const tween = TweenService.Create(part, tweenInfo, { Size: targetSize });
		tween.Play();
	}
	public triggerPlayerEvent(players: Player): void {
		// Do nothing
	}
}

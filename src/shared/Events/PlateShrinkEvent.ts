import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";

export class PlateShrinkEvent extends BaseEvent {
	private studAmount: number;
	constructor(studAmount: number) {
		super(EventType.Plate, "Plate shrink", 2);
		this.studAmount = studAmount;
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const currentSize = plate.getOriginalScale() * plate.getScale();
		const newScale = (currentSize - this.studAmount) / plate.getOriginalScale();
		if (newScale < 0) {
			plate.setScale(0.0001);
			plateModel.ScaleTo(0.00001);
			return;
		}
		plate.setScale(newScale);
		plateModel.ScaleTo(newScale);
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

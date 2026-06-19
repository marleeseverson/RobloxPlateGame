import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";

export class PlateSphere extends BaseEvent {
	private studAmount: number;
	constructor(studAmount: number) {
		super(EventType.Plate, "Plate Sphere", 1);
		this.studAmount = studAmount;
	}

	public triggerPlateEvent(plate: Plate): void {
		const plateModel = plate.getModel();
		const currentSize = plate.getOriginalScale() * plate.getScale();
		const part = plate.getModel().PrimaryPart as Part;
		part.Shape = Enum.PartType.Ball;
		part.Size = new Vector3(currentSize, currentSize, currentSize);
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

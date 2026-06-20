import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";
import { Signals } from "shared/signals";
import EnemyList from "shared/Enemy/EnemyTypes/EnemyList";
import Remotes from "shared/remotes";

export class PlateSlipperyEvent extends BaseEvent {
	constructor() {
		super(EventType.Plate, "Icy", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePart = plate.getModel().PrimaryPart as Part;
		const properties = new PhysicalProperties(0.7, 0, 0, 50, 0);
		platePart.Color = new Color3(0.12, 0.75, 0.82);
		platePart.Material = Enum.Material.Ice;
		platePart.CustomPhysicalProperties = properties;
	}
	public triggerPlayerEvent(players: Player): void {
		// Do nothing
	}
}

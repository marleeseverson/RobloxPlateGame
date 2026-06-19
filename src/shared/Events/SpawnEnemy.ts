import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";
import { Signals } from "shared/signals";
import EnemyList from "shared/Enemy/EnemyTypes/EnemyList";

export class SpawnEnemy extends BaseEvent {
	private spawnUpperOffset = 5;

	constructor() {
		super(EventType.Plate, "Enemy", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePos = plate.getRandomPointOnPlate();
		const spawnPosition = new Vector3(platePos.X, platePos.Y + this.spawnUpperOffset, platePos.Z);
		Signals.SpawnEnemy.Fire(spawnPosition, EnemyList.swordEnemy);
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

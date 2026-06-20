import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";

export class SpawnMeteorEvent extends BaseEvent {
	private metTemplate = ServerStorage.WaitForChild("EventItems").WaitForChild("Meteor") as BasePart;
	private spawnLowerOffset = 10;
	private riseTime = 10;
	private tempFolder = Workspace.WaitForChild("Temp") as Folder;

	constructor() {
		super(EventType.Plate, "Meteor", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePos = plate.getRandomPointOnPlate();
		const met = this.metTemplate.Clone();
		met.Parent = this.tempFolder;
		met.PivotTo(new CFrame(platePos.X, platePos.Y + 150, platePos.Z));

		const primaryPart = plate.getModel().PrimaryPart;
		if (primaryPart) {
			this.connectDamage(met, primaryPart);
		}

		task.spawn(() => {
			task.wait(10);
			met.Destroy();
		});
	}

	public triggerPlayerEvent(players: Player): void {
		// Do nothing
	}

	private connectDamage(meteorPart: BasePart, plate: BasePart) {
		const lastDamageMap = new Map<Player, number>();

		meteorPart.Touched.Connect((other) => {
			const humanoid = other.Parent?.FindFirstChild("Humanoid") as Humanoid;
			if (humanoid) {
				const character = humanoid.Parent;
				const player = Players.GetPlayerFromCharacter(character);
				if (player) {
					const currentTime = os.clock();
					if (currentTime - (lastDamageMap.get(player) ?? 0) >= 1) {
						lastDamageMap.set(player, currentTime);
						humanoid.TakeDamage(50);
					}
				}
			} else if (other.Name !== "Plate") {
				const model = other.FindFirstAncestorOfClass("Model");
				const weldedPart = model?.PrimaryPart;
				if (weldedPart) {
					weldedPart.Anchored = false;
					this.breakWelds(weldedPart, plate);
				}
			}
		});
	}

	private breakWelds(part: BasePart, plateBasePart: BasePart) {
		part.FindFirstChildOfClass("WeldConstraint")?.Destroy();
		part.FindFirstChildOfClass("Weld")?.Destroy();

		for (const descendant of part.GetDescendants()) {
			if (descendant.IsA("WeldConstraint") || descendant.IsA("Weld")) {
				descendant.Destroy();
			}
		}

		for (const child of plateBasePart.GetChildren()) {
			if ((child.IsA("WeldConstraint") || child.IsA("Weld")) && (child.Part0 === part || child.Part1 === part)) {
				child.Destroy();
			}
		}
	}
}

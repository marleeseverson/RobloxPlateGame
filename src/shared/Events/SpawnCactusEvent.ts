import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";

export class SpawnCactusEvent extends BaseEvent {
	private cactusTemplate = ServerStorage.WaitForChild("EventItems").WaitForChild("Cactus") as Model;
	private spawnLowerOffset = 5;
	private riseTime = 3;
	constructor() {
		super(EventType.Plate, "Cactus", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePos = plate.getRandomPointOnPlate();
		const spawnPosition = new Vector3(platePos.X, platePos.Y - this.spawnLowerOffset, platePos.Z);
		const targetPosition = new Vector3(platePos.X, platePos.Y + 3, platePos.Z);
		const cactus = this.cactusTemplate.Clone();
		cactus.Parent = plate.getModel();

		cactus.PivotTo(new CFrame(spawnPosition));

		const currentPivot = new CFrame(targetPosition);
		const targetPivot = currentPivot.mul(CFrame.fromEulerAnglesXYZ(0, math.random(0, 360), 0));

		const primaryPart = cactus.PrimaryPart;
		if (primaryPart) {
			const tweenInfo = new TweenInfo(this.riseTime);
			const tween = TweenService.Create(primaryPart, tweenInfo, {
				CFrame: targetPivot,
			});
			tween.Play();
			this.connectDamage(cactus);
		}
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}

	private connectDamage(cactusModel: Model) {
		const parts = cactusModel.GetDescendants();

		for (const descendant of parts) {
			if (descendant.IsA("BasePart")) {
				descendant.Touched.Connect((other) => {
					const humanoid = other.Parent?.FindFirstChild("Humanoid") as Humanoid;
					if (humanoid) {
						humanoid.TakeDamage(2);
					}
				});
			}
		}
	}
}

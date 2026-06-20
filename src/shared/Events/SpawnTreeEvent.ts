import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";

export class SpawnTreeEvent extends BaseEvent {
	private treeTemplate = ServerStorage.WaitForChild("EventItems").WaitForChild("Tree") as Model;
	private spawnLowerOffset = 10;
	private riseTime = 10;
	private tempFolder = Workspace.WaitForChild("Temp") as Folder;

	constructor() {
		super(EventType.Plate, "Tree", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePos = plate.getRandomPointOnPlate();
		const treeHeight = math.random(4, 15);
		const spawnPosition = new Vector3(platePos.X, platePos.Y - this.spawnLowerOffset, platePos.Z);
		const targetPosition = new Vector3(platePos.X, platePos.Y + treeHeight / 2, platePos.Z);
		const tree = this.treeTemplate.Clone();

		// Stump ===========================
		const stump = tree.FindFirstChild("Main") as BasePart;
		stump.Size = new Vector3(1, treeHeight, 1);

		// Leaves ===============================
		const hue = math.random(90, 150) / 360;
		const color = Color3.fromHSV(hue, 0.8, 0.7);
		const treeLeaves = stump.FindFirstChild("Leaves") as BasePart;
		const leavesSize = new Vector3(math.random(6, 7), math.random(5, 6), math.random(6, 7));
		treeLeaves.Size = leavesSize;
		treeLeaves.Color = color;

		const weld = stump.FindFirstChildOfClass("Weld");
		if (weld) {
			weld.C0 = new CFrame(0, treeHeight / 2 + leavesSize.Y / 2, 0);
			weld.C1 = new CFrame();
		}
		// ======================================

		const primaryPart = tree.PrimaryPart;
		if (primaryPart) {
			primaryPart.Anchored = true;
		}
		tree.Parent = this.tempFolder;
		tree.PivotTo(new CFrame(spawnPosition));

		const targetPivot = new CFrame(targetPosition).mul(CFrame.fromEulerAnglesXYZ(0, math.random(0, 360), 0));

		const platePrimaryPart = plate.getModel().PrimaryPart;
		if (primaryPart && platePrimaryPart) {
			const tweenInfo = new TweenInfo(this.riseTime);
			const tween = TweenService.Create(primaryPart, tweenInfo, { CFrame: targetPivot });
			tween.Play();
			tween.Completed.Connect(() => {
				const weldConstraint = new Instance("WeldConstraint");
				weldConstraint.Part0 = platePrimaryPart;
				weldConstraint.Part1 = primaryPart;
				weldConstraint.Parent = platePrimaryPart;
				if (tree.PrimaryPart) {
					tree.PrimaryPart.Anchored = false;
				}
			});
		}
	}

	public triggerPlayerEvent(players: Player): void {
		// Do nothing
	}
}

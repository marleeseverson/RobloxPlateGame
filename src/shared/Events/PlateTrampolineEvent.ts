import { Plate } from "shared/plate";
import { BaseEvent, EventType } from "./BaseEvent";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { ServerStorage } from "@rbxts/services";
import { Signals } from "shared/signals";
import EnemyList from "shared/Enemy/EnemyTypes/EnemyList";
import Remotes from "shared/remotes";

export class PlateTrampolineEvent extends BaseEvent {
	constructor() {
		super(EventType.Plate, "trampoline", 1);
	}

	public triggerPlateEvent(plate: Plate): void {
		const platePart = plate.getModel().PrimaryPart as Part;
		const properties = new PhysicalProperties(0.7, 0.3, 10);
		platePart.Color = new Color3(0.19, 0.19, 0.19);
		platePart.CustomPhysicalProperties = properties;

		Remotes.Server.Get("OnPlateBecomesTrampoline").SendToAllPlayers(platePart);

		// platePart.Touched.Connect((other) => {
		// 	const model = other.Parent;
		// 	const humanoidRoot = model?.FindFirstChild("HumanoidRootPart") as BasePart;
		// 	const humanoid = model?.FindFirstChildOfClass("Humanoid");
		// 	if (humanoidRoot && humanoid) {
		// 		print("Huamn touched " + other.Name + ", " + humanoidRoot.Name);
		// 		const startJumpHeight = humanoid.JumpHeight;
		// 		humanoid.JumpHeight = 30;
		// 		humanoid.Jump = true;
		// 		task.delay(0.5, () => {
		// 			humanoid.JumpHeight = startJumpHeight;
		// 		});
		// 	}
		// });
	}
	public triggerPlayerEvent(players: Player[]): void {
		// Do nothing
	}
}

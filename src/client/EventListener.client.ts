import { Players } from "@rbxts/services";
import Remotes from "shared/remotes";

const player = Players.LocalPlayer;

Remotes.Client.Get("OnPlateBecomesTrampoline").Connect((part) => {
	print("Recived");
	part.Touched.Connect((other) => {
		const character = other.Parent;
		if (character === player.Character) {
			const humanoid = character?.FindFirstChildOfClass("Humanoid");
			if (humanoid) {
				print("Make jump");
				const jumpHeight = humanoid.JumpHeight;
				humanoid.JumpHeight = 25;
				humanoid.ChangeState(Enum.HumanoidStateType.Jumping);
				task.defer(() => {
					humanoid.JumpHeight = jumpHeight;
				});
			}
		}
	});
});

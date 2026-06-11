import { Players } from "@rbxts/services";
import { Signals } from "shared/signals";

Players.PlayerAdded.Connect((player: Player) => {
	player.CharacterAdded.Connect((character: Model) => {
		const humanoid = character.WaitForChild("Humanoid") as Humanoid;
		humanoid.Died.Connect(() => {
			print("Death");
			Signals.OnPlayerDeath.Fire(player);
		});
	});
});

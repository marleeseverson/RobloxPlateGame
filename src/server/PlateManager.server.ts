import { GameStateType } from "shared/GameState/GameStateType";
import PlateService = require("shared/PlateService");
import { GameEvents } from "shared/gameEvents";
import { Signals } from "shared/signals";

Signals.OnGameStateChanged.Connect((newStateType) => {
	if (newStateType === GameStateType.Playing) {
		PlateService.createGridObjects();
		PlateService.createPlates();
		GameEvents.OnPlayerPlatesCreated.Fire();
	}
	if (newStateType === GameStateType.RoundOver) {
		PlateService.clearAllPlates();
	}
});

Signals.OnPlayerDeath.Connect((player: Player) => {
	print("Player Died : " + player.Name);
	PlateService.removeActivePlate(player);
});

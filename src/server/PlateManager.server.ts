import PlateService = require("shared/PlateService");
import { GameEvents } from "shared/gameEvents";
import { Signals } from "shared/signals";

GameEvents.OnInRoundStateEntered.Event.Connect(() => {
	PlateService.createGridObjects();
	PlateService.createPlates();
	GameEvents.OnPlayerPlatesCreated.Fire();
});

Signals.OnPlayerDeath.Connect((player: Player) => {
	print("Player Died : " + player.Name);
	PlateService.removeActivePlate(player);
});

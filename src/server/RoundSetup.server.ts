import { GameEvents } from "shared/gameEvents";

GameEvents.OnInRoundStateEntered.Event.Connect(() => {
	//print("Set up round");
	GameEvents.OnTeleportPlayersToPlayArea.Fire();
});

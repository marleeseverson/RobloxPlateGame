import { Teams, Players } from "@rbxts/services";
import { GameEvents } from "shared/gameEvents";
import { GameStateType } from "shared/GameState/GameStateType";
import PlateService from "shared/PlateService";
import { Signals } from "shared/signals";
import { lobbyTeam, playingTeam } from "shared/teams";

Players.PlayerAdded.Connect((player) => {
	player.Team = lobbyTeam;
});

Signals.OnPlayerDeath.Connect((player) => {
	if (player.Team === playingTeam) {
		player.Team = lobbyTeam;
	}
});

Signals.OnGameStateChanged.Connect((newStateType) => {
	if (newStateType === GameStateType.RoundOver) {
		changePlayingPlayersToLobby();
		teleportPlayersToLobby();
	}
});

function teleportPlayer(player: Player, position: Vector3) {
	const character = player.Character;
	if (!character) return;

	character.PivotTo(new CFrame(position));
}

function teleportPlayersToPlayArea() {
	//print("Teleporting players");

	const grid = PlateService.getGrid();
	for (let i = 0; i < grid.getGridX(); i++) {
		for (let j = 0; j < grid.getGridY(); j++) {
			const gridObject = grid.getPlateGridObjectAtGridPosition(i, j);
			const plate = gridObject?.getPlate();
			const player = plate?.getPlayer();
			//print("Player name : " + player?.Name);
			if (gridObject !== undefined && player !== undefined) {
				const teleportPos = grid.getWorldPositionFromPlateGridObject(gridObject);
				teleportPlayer(player, new Vector3(teleportPos.X, teleportPos.Y + 10, teleportPos.Z));
			}
		}
	}
}
function teleportPlayersToLobby() {
	for (const player of Players.GetPlayers()) {
		teleportPlayer(player, new Vector3(0, 10, 0));
	}
}
function changeLobbyPlayersToPlaying(): void {
	for (const player of Players.GetPlayers()) {
		if (player.Team === lobbyTeam) {
			player.Team = playingTeam;
		}
	}
	GameEvents.OnPlayersAddedToPlayingTeam.Fire();
}

function changePlayingPlayersToLobby(): void {
	for (const player of Players.GetPlayers()) {
		if (player.Team === playingTeam) {
			player.Team = lobbyTeam;
		}
	}
}

GameEvents.OnPlayerPlatesCreated.Event.Connect(() => {
	changeLobbyPlayersToPlaying();
	teleportPlayersToPlayArea();
});

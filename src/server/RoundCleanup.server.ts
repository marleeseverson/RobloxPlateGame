import { Workspace } from "@rbxts/services";
import { GameStateType } from "shared/GameState/GameStateType";
import { Signals } from "shared/signals";

const tempFolder = new Instance("Folder");
tempFolder.Name = "Temp";
tempFolder.Parent = Workspace;

Signals.OnGameStateChanged.Connect((newState) => {
	if (newState === GameStateType.RoundOver) {
		clearAllItemsInFolder();
	}
});

function clearAllItemsInFolder() {
	tempFolder.ClearAllChildren();
}

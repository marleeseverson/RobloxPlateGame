import { Players, Workspace } from "@rbxts/services";
import { EventType } from "shared/Events/BaseEvent";
import { EventStateType } from "shared/EventService/EventStateType";
import Remotes from "shared/remotes";

let outlines: SelectionBox[] = [];

Remotes.Client.Get("OnPlateEventsFinalized").Connect((plateModels, players, eventType) => {
	if (eventType === EventType.Plate) {
		for (const plateModel of plateModels) {
			const selectionBox = new Instance("SelectionBox");
			selectionBox.Parent = Workspace;

			selectionBox.Adornee = plateModel;
			selectionBox.Color3 = new Color3(0.13, 0.45, 0.82);
			selectionBox.LineThickness = 0.1;
			outlines.push(selectionBox);
			print("Selection box created");
		}
	} else {
		print("Player event!");
		for (const player of players) {
			const selectionBox = new Instance("SelectionBox");
			selectionBox.Parent = Workspace;
			selectionBox.Adornee = player.Character;
			selectionBox.Color3 = new Color3(0.13, 0.45, 0.82);
			selectionBox.LineThickness = 0.1;
			outlines.push(selectionBox);
			print("Selection box created for player");
		}
	}
});

Remotes.Client.Get("OnGameEventStateChanged").Connect((newEventType) => {
	if (newEventType === EventStateType.Firing) {
		for (const outline of outlines) {
			outline.Destroy();
		}
		outlines.clear();
	}
});

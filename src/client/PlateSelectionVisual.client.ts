import { Players, Workspace } from "@rbxts/services";
import { EventStateType } from "shared/EventService/EventStateType";
import Remotes from "shared/remotes";

let outlines: SelectionBox[] = [];

Remotes.Client.Get("OnPlateEventsFinalized").Connect((plateModels) => {
	for (const plateModel of plateModels) {
		const selectionBox = new Instance("SelectionBox");
		selectionBox.Parent = Workspace;
		selectionBox.Adornee = plateModel;
		selectionBox.Color3 = new Color3(0.13, 0.45, 0.82);
		selectionBox.LineThickness = 0.1;
		outlines.push(selectionBox);
		print("Selection box created");
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

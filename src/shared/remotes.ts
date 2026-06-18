import Net, { Definitions } from "@rbxts/net";
import { GameStateType } from "shared/GameState/GameStateType";
import { EventStateType } from "./EventService/EventStateType";
import { EventType } from "./Events/BaseEvent";
import { Plate } from "./plate";
import { ToolType } from "./ToolService/ToolType";

const Remotes = Net.CreateDefinitions({
	UpdateIntermissionUI: Definitions.ServerToClientEvent<[time: number]>(),
	OnGameStateChanged: Definitions.ServerToClientEvent<[gameStateType: GameStateType, timeRemaining: number]>(),
	OnGameEventUpdated: Definitions.ServerToClientEvent<[newEventName: string]>(),
	OnGameEventTimerUpdated: Definitions.ServerToClientEvent<[newTime: number]>(),
	OnGameEventStateChanged: Definitions.ServerToClientEvent<[newEventStateType: EventStateType]>(),
	OnEventAndPlatesSelected:
		Definitions.ServerToClientEvent<[eventName: string, targets: string[], selectedPlates: Model[]]>(),
	OnPlayerWin: Definitions.ServerToClientEvent<[playerName: string]>(),
	OnPlateEventsFinalized: Definitions.ServerToClientEvent<[plateMode: Model[]]>(),
	OnPlayerGivenItem: Definitions.ServerToClientEvent<[toolType: ToolType, tool: Tool]>(),
});

export default Remotes;

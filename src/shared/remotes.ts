import Net, { Definitions } from "@rbxts/net";
import { GameStateType } from "./GameState/GameStateMachine";
import { EventStateType } from "./EventService/EventStateType";
import { EventType } from "./Events/BaseEvent";

const Remotes = Net.CreateDefinitions({
	UpdateIntermissionUI: Definitions.ServerToClientEvent<[time: number]>(),
	OnGameStateChanged: Definitions.ServerToClientEvent<[gameStateType: GameStateType, timeRemaining: number]>(),
	OnGameEventUpdated: Definitions.ServerToClientEvent<[newEventName: string]>(),
	OnGameEventTimerUpdated: Definitions.ServerToClientEvent<[newTime: number]>(),
	OnGameEventStateChanged: Definitions.ServerToClientEvent<[newEventStateType: EventStateType]>(),
	OnEventAndPlatesSelected: Definitions.ServerToClientEvent<[eventName: string, targets: string[]]>(),
});

export default Remotes;

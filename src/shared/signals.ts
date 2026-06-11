import Signal from "@rbxts/signal";
import { BaseGameState } from "./GameState/BaseGameState";
import { BaseEvent } from "./Events/BaseEvent";
import { EventStateType } from "./EventService/EventStateType";
import { GameStateType } from "shared/GameState/GameStateType";
import { Plate } from "./plate";

const OnPlayerDeath = new Signal<(player: Player) => void>();
const OnGameStateChanged = new Signal<(newGameStateType: GameStateType) => void>();
const OnEventChanged = new Signal<(newEvent: BaseEvent) => void>();
const OnEventStateChanged = new Signal<(newEventStateType: EventStateType) => void>();
const RequestRandomEvent = new Signal<(callback: (newEvent: BaseEvent) => void) => void>();
const RequestRandomPlates = new Signal<(count: number, callback: (plates: Plate[]) => void) => void>();

export const Signals = {
	OnPlayerDeath,
	OnGameStateChanged,
	OnEventChanged,
	OnEventStateChanged,
	RequestRandomEvent,
	RequestRandomPlates,
};

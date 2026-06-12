import React, { useEffect, useState } from "@rbxts/react";
import { BaseEvent } from "shared/Events/BaseEvent";
import { PlateShrinkEvent } from "shared/Events/PlateShrinkEvent";
import { GameStateType } from "shared/GameState/GameStateType";
import Remotes from "shared/remotes";
import BasicLabel from "./BasicLabel";
import EventTimerTracker from "./EventTimerTracker";
import { EventStateType } from "shared/EventService/EventStateType";

function RoundEvents() {
	const [eventName, setNewEvent] = useState("Game Started!");
	const [targetNames, setTargetNames] = useState(["Fart1", "Fart2"]);
	const [timeLeft, setTimeLeft] = useState(1);
	const [gameState, setGameState] = useState(GameStateType.Intermission);
	const [eventState, setEventState] = useState(EventStateType.Idle);

	useEffect(() => {
		const OnEventAndTargetsUpdated = Remotes.Client.Get("OnEventAndPlatesSelected");
		const connection = OnEventAndTargetsUpdated.Connect((newEventName: string, targetNames: string[]) => {
			setNewEvent(newEventName);
			setTargetNames(targetNames);
		});
		const OnEventTimerUpdated = Remotes.Client.Get("OnGameEventTimerUpdated");
		const connection1 = OnEventTimerUpdated.Connect((newTime: number) => {
			setTimeLeft(newTime);
		});
		const OnGameStateUpdated = Remotes.Client.Get("OnGameStateChanged");
		const connection2 = OnGameStateUpdated.Connect((newState: GameStateType) => {
			setGameState(newState);
		});
		const OnGameEventStateChanged = Remotes.Client.Get("OnGameEventStateChanged");
		const connection3 = OnGameEventStateChanged.Connect((newEventStateType) => {
			setEventState(newEventStateType);
		});

		return () => {
			connection.Disconnect();
			connection1.Disconnect();
			connection2.Disconnect();
			connection3.Disconnect();
		};
	}, []);

	return (
		<frame
			Size={new UDim2(0.5, 0, 0.1, 0)}
			Position={new UDim2(0.5, 0, 0, 10)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundColor3={new Color3(0, 0, 0)}
			BackgroundTransparency={0.5}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uipadding PaddingLeft={new UDim(0, 15)} />
			{gameState === GameStateType.Playing && eventState === EventStateType.Countdown ? (
				<BasicLabel text={eventName + " is happening in " + timeLeft} size={new UDim2(0.9, 0, 1, 0)} />
			) : undefined}
			{gameState === GameStateType.Playing && eventState === EventStateType.Announcing ? (
				<BasicLabel text={"Targets: " + targetNames.join(",")} size={new UDim2(0.9, 0, 1, 0)} />
			) : undefined}
		</frame>
	);
}

export default RoundEvents;

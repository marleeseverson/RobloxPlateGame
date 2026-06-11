import { useEffect, useState } from "@rbxts/react";
import { GameStateType } from "shared/GameState/GameStateMachine";
import Remotes from "shared/remotes";
import React from "@rbxts/react";
import BasicLabel from "./BasicLabel";

function EventTimerTracker() {
	const [timeLeft, setTime] = useState(5);

	useEffect(() => {
		const OnEventTimerUpdated = Remotes.Client.Get("OnGameEventTimerUpdated");
		const connection1 = OnEventTimerUpdated.Connect((newTime: number) => {
			setTime(newTime);
		});

		return () => {
			connection1.Disconnect();
		};
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<BasicLabel text={"" + timeLeft} size={new UDim2(0.5, 0, 0.5, 0)} />
		</frame>
	);
}

export default EventTimerTracker;

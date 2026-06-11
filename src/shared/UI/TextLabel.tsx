import React = require("@rbxts/react");
import { useEffect, useState } from "@rbxts/react";
import { GameStateType } from "shared/GameState/GameStateType";
import Remotes from "../remotes";
import BasicLabel from "./BasicLabel";
interface TextLabelProps {
	text: string;
}

function TextLabel({ text }: TextLabelProps) {
	const [timeLeft, setTime] = useState(1);
	const [currentState, setState] = useState(GameStateType.WaitingForMorePlayers);
	const [winnerName, setWinnerName] = useState("");
	useEffect(() => {
		const OnGameStateChanged = Remotes.Client.Get("OnGameStateChanged");
		const connection1 = OnGameStateChanged.Connect((gameStateType: GameStateType, timeRemaining: number) => {
			setTime(timeRemaining);
			setState(gameStateType);
		});
		const UpdateTimerUI = Remotes.Client.Get("UpdateIntermissionUI");
		const connection2 = UpdateTimerUI.Connect((timeLeft: number) => {
			setTime(timeLeft);
		});
		const OnPlayerWin = Remotes.Client.Get("OnPlayerWin");
		const connection3 = OnPlayerWin.Connect((name) => {
			setWinnerName(name);
		});
		return () => {
			connection1.Disconnect();
			connection2.Disconnect();
			connection3.Disconnect();
		};
	}, []);

	if (currentState === GameStateType.Playing) {
		return undefined;
	}
	return (
		<frame
			Size={new UDim2(0.5, 0, 0.1, 0)}
			Position={new UDim2(0.5, 0, 0, 10)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundColor3={new Color3(0, 0, 0)}
			BackgroundTransparency={0.5}
		>
			{currentState === GameStateType.WaitingForMorePlayers ? (
				<BasicLabel text="Waiting for more players" size={new UDim2(1, 0, 1, 0)} />
			) : undefined}
			{currentState === GameStateType.Intermission ? (
				<BasicLabel text={"Starting game in : " + timeLeft} size={new UDim2(1, 0, 1, 0)} />
			) : undefined}
			{currentState === GameStateType.RoundOver ? (
				<BasicLabel text={"Round Over, " + winnerName + " wins!"} size={new UDim2(1, 0, 1, 0)} />
			) : undefined}
		</frame>
	);
}

export default TextLabel;

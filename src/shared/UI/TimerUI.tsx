import React, { useEffect, useState } from "@rbxts/react";
import Remotes from "../remotes";
import { GameEvents } from "../gameEvents";
import { UserService } from "@rbxts/services";

interface TimerUIProps {
	initalTime: number;
}

function Timer({ initalTime }: TimerUIProps) {
	const [time, setTime] = useState(initalTime);
	useEffect(() => {
		const OnUpdateUI = Remotes.Client.Get("UpdateIntermissionUI");
		const connection = OnUpdateUI.Connect((newTime) => {
			setTime(newTime);
		});

		return () => connection.Disconnect();
	}, []);

	return (
		<frame
			Size={UDim2.fromScale(0.3, 0.1)}
			Position={UDim2.fromScale(0.5, 0)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uistroke Color={Color3.fromRGB(70, 70, 70)} Thickness={1.5} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<textlabel
				Size={UDim2.fromScale(1, 1)}
				Text={"Time: " + tostring(time)}
				TextScaled={true}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}

export default Timer;

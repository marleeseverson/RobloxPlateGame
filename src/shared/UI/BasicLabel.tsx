import React = require("@rbxts/react");
interface TextLabelProps {
	text: string;
	size: UDim2;
}

function BasicLabel({ text, size }: TextLabelProps) {
	return (
		<textlabel
			Text={text}
			TextScaled={true}
			TextColor3={new Color3(1, 1, 1)}
			//AnchorPoint={new Vector2(0.5, 0.5)}
			Size={size}
			BackgroundTransparency={1}
		></textlabel>
	);
}

export default BasicLabel;

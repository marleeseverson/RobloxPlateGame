import React = require("@rbxts/react");
interface InventoryProps {
	itemName: string;
	isSelected: boolean;
	slotNumber: number;
}

function InventorySlot({ itemName, isSelected, slotNumber }: InventoryProps) {
	return (
		<>
			<textlabel
				Text={itemName}
				TextScaled={true}
				TextColor3={isSelected ? new Color3(1, 0, 0) : new Color3(0.02, 0.73, 0.65)}
				//AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(1, 0, 1, 0)}
				TextXAlignment={Enum.TextXAlignment.Center}
				BackgroundTransparency={1}
				Font={Enum.Font.Code}
			/>
			<textlabel
				Text={tostring(slotNumber)}
				TextScaled={true}
				TextColor3={new Color3(0.07, 0.97, 0.27)}
				//AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(0.3, 0, 0.3, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
				Font={Enum.Font.Code}
			/>
		</>
	);
}

export default InventorySlot;

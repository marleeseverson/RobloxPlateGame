import React = require("@rbxts/react");
import { useState, useEffect } from "@rbxts/react";
import { ClientSignals } from "shared/signals";
import InventorySlot from "./InventorySlot";
import { ToolData } from "shared/ToolService/ToolData";

function ItemInventory() {
	const [inventory, setInventory] = useState<ToolData[]>([]);
	const [selectedItem, setItem] = useState<ToolData>();

	useEffect(() => {
		const OnClientInventoryUpdated = ClientSignals.OnPlayerInventoryUpdated;
		const connection = OnClientInventoryUpdated.Connect((inventory) => {
			setInventory(inventory);
		});
		const OnClientNewItemSelected = ClientSignals.OnPlayerSelectedItemUpdated;
		const connection2 = OnClientNewItemSelected.Connect((newItem) => {
			setItem(newItem);
		});

		return () => {
			connection.Disconnect();
			connection2.Disconnect();
		};
	}, []);

	return (
		<>
			{inventory.size() > 0 ? (
				<frame
					Size={new UDim2(0.15, 0, 0.15, 0)}
					AnchorPoint={new Vector2(0.5, 1)}
					Position={new UDim2(0.5, 0, 1, -10)}
					BackgroundTransparency={1}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, 10)}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
					/>
					{inventory.map((toolData, index) => (
						<>
							<uiaspectratioconstraint AspectRatio={1} />
							<frame key={index} Size={new UDim2(1, 0, 1, 0)} AnchorPoint={new Vector2(0.5, 0.5)}>
								<InventorySlot
									itemName={toolData.name}
									isSelected={selectedItem === toolData}
									slotNumber={index + 1}
								/>
							</frame>
						</>
					))}
				</frame>
			) : undefined}
		</>
	);
}

export default ItemInventory;

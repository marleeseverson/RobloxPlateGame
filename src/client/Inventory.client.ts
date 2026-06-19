import { Players, RunService, UserInputService } from "@rbxts/services";
import Remotes from "shared/remotes";
import { ClientSignals } from "shared/signals";
import { ToolData } from "shared/ToolService/ToolData";
import ToolService from "shared/ToolService/ToolService";
import { StarterGui } from "@rbxts/services";

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);
const player = Players.LocalPlayer;

let backpack: Instance;
let playerToolConnection: RBXScriptConnection;

let tools: ToolData[] = [];

if (player.Character) {
	setUp();
}

player.CharacterAdded.Connect(() => {
	setUp();
});

function setUp() {
	backpack = player.WaitForChild("Backpack");
	tools.clear();
	tools = [];
	ClientSignals.OnPlayerInventoryUpdated.Fire(tools);
	ClientSignals.OnPlayerSelectedItemUpdated.Fire(undefined as any);
	connectToPlayerToolRemote();
	// connectCharacterToolEvents();
	// connectPlayerBackpackToolEvents();
}

function connectToPlayerToolRemote() {
	if (playerToolConnection) {
		playerToolConnection.Disconnect();
	}

	playerToolConnection = Remotes.Client.Get("OnPlayerGivenItem").Connect((toolType, tool) => {
		print("Get tool fired");
		const toolData = ToolService.getToolDataFromType(toolType);
		toolData.tool = tool;
		listenToTool(toolData);
		tools.push(toolData);
		ClientSignals.OnPlayerInventoryUpdated.Fire(tools);
	});
}

function listenToTool(toolData: ToolData) {
	toolData.tool.CanBeDropped = false;
	toolData.tool.Equipped.Connect(() => {
		//print(toolData.name + ", Equipped");
		ClientSignals.OnPlayerSelectedItemUpdated.Fire(toolData);
	});

	toolData.tool.Unequipped.Connect(() => {
		//print(toolData.name + ", Unequiped");
		ClientSignals.OnPlayerSelectedItemUpdated.Fire(undefined as any);
	});
	toolData.tool.Activated.Connect(() => {
		if (toolData.usesLeft <= 1) {
			print("Break tool");
			deleteTool(toolData);
		}
		toolData.usesLeft -= 1;
		print("Tool used " + toolData.usesLeft);
	});
}

function deleteTool(toolData: ToolData) {
	for (let i = 0; i < tools.size(); i++) {
		if (tools[i] === toolData) {
			tools[i].tool.Destroy();
			tools.remove(i);
			ClientSignals.OnPlayerInventoryUpdated.Fire(tools);
		}
	}
}

function equipTool(tool: Tool) {
	const character = player.Character;
	if (character) {
		tool.Parent = character;
	}
}

function unequipTool() {
	const character = player.Character;
	const backpack = player.FindFirstChild("Backpack");
	if (character) {
		const item = character.FindFirstChildOfClass("Tool");
		if (item) {
			item.Parent = backpack;
		}
	}
}

function hasToolEquipped(tool: Tool) {
	const character = player.Character;
	if (character) {
		const item = character.FindFirstChildOfClass("Tool");
		if (tool === item) {
			return true;
		}
	}
	return false;
}

function handleTool(tool: Tool) {
	if (hasToolEquipped(tool)) {
		unequipTool();
	} else {
		unequipTool();
		equipTool(tool);
	}
}

UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode === Enum.KeyCode.One && tools.size() > 0) {
		handleTool(tools[0].tool);
	} else if (input.KeyCode === Enum.KeyCode.Two && tools.size() > 1) {
		handleTool(tools[1].tool);
	} else if (input.KeyCode === Enum.KeyCode.Three && tools.size() > 2) {
		handleTool(tools[2].tool);
	}
});

// function checkIsToolInBackpack(tool: Tool): boolean {
// 	for (let i = 0; i < tools.size(); i++) {
// 		if (tools[i] === tool) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

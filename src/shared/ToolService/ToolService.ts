import { Signals } from "shared/signals";
import { Tools } from "./Tools";
import { ToolType } from "./ToolType";
import Remotes from "shared/remotes";
import { ToolData } from "./ToolData";

class ToolService {
	init() {
		//Nothing
	}
	givePlayerTool(player: Player, toolType: ToolType) {
		const backpack = player.FindFirstChild("Backpack");
		if (!backpack) {
			return;
		}
		const toolTemplate = this.getToolDataFromType(toolType).tool;
		const tool = toolTemplate.Clone();
		tool.Parent = backpack;
		Remotes.Server.Get("OnPlayerGivenItem").SendToPlayer(player, toolType, tool);
	}

	//getToolDataFromTool()

	getToolDataFromType(toolType: ToolType): ToolData {
		if (toolType === ToolType.Sword) {
			return Tools.sword;
		} else if (toolType === ToolType.Bomb) {
			return Tools.bomb;
		}
		return undefined as any;
	}
}

export = new ToolService();

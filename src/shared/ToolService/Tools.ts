import { ReplicatedStorage } from "@rbxts/services";
import { ToolData } from "./ToolData";
import { ToolType } from "./ToolType";

const swordTool = ReplicatedStorage.WaitForChild("Tools").WaitForChild("Sword") as Tool;
const bombTool = ReplicatedStorage.WaitForChild("Tools").WaitForChild("Bomb") as Tool;
const sword = new ToolData(swordTool, "Sword", ToolType.Sword, 5);
const bomb = new ToolData(bombTool, "Bomb", ToolType.Bomb, 3);

export const Tools = {
	sword,
	bomb,
};

import { ToolType } from "./ToolType";

export class ToolData {
	public tool: Tool;
	public name: string;
	public toolType: ToolType;
	public usesLeft: number;

	constructor(tool: Tool, name: string, toolType: ToolType, uses: number) {
		this.tool = tool;
		this.name = name;
		this.toolType = toolType;
		this.usesLeft = uses;
	}
}

import { PlateGridObject } from "./plateGridObject";
import { ServerStorage, Workspace } from "@rbxts/services";

export class PlateGrid {
	private gridStartLocation: BasePart;
	private cellSize: number;
	private gridSizeX: number;
	private gridSizeY: number;
	private testVisualPrefab: BasePart;
	private grid: (PlateGridObject | undefined)[][] = [];

	constructor(gridStartLocation: BasePart, x: number, y: number, cellSize: number) {
		this.gridStartLocation = gridStartLocation;
		this.gridSizeX = x;
		this.gridSizeY = y;
		this.cellSize = cellSize;
		this.testVisualPrefab = ServerStorage.WaitForChild("TestVisual") as BasePart;
	}

	public createGridObjects() {
		for (let i = 0; i < this.gridSizeX; i++) {
			this.grid[i] = [];
			for (let j = 0; j < this.gridSizeY; j++) {
				const gridObject = new PlateGridObject(undefined as any, new Vector2(i, j));
				this.grid[i][j] = gridObject;
				const testVisual = this.testVisualPrefab.Clone();
				testVisual.Parent = Workspace;
				testVisual.Position = this.getWorldPositionFromPlateGridObject(gridObject);
			}
		}
	}

	public getPlateGridObjectAtGridPosition(x: number, y: number): PlateGridObject | undefined {
		return this.grid[x]?.[y];
	}

	public getRandomGridPosition(): Vector2 {
		return new Vector2(math.random(0, this.gridSizeX - 1), math.random(0, this.gridSizeY - 1));
	}

	public getGridX(): number {
		return this.gridSizeX;
	}
	public getGridY(): number {
		return this.gridSizeY;
	}

	public getWorldPositionFromPlateGridObject(gridObject: PlateGridObject): Vector3 {
		const gridPos = gridObject.getGridPosition();

		return new Vector3(
			this.gridStartLocation.Position.X + gridPos.X * this.cellSize,
			this.gridStartLocation.Position.Y,
			this.gridStartLocation.Position.Z + gridPos.Y * this.cellSize,
		);
	}

	public clearGridObjects() {
		this.grid = [];
	}
}

import { Plate } from "./plate";

export class PlateGridObject {
	private plate: Plate;
	private gridPos: Vector2;

	constructor(plate: Plate, gridPos: Vector2) {
		this.plate = plate;
		this.gridPos = gridPos;
	}

	public getGridPosition(): Vector2 {
		return this.gridPos;
	}
	public getPlate(): Plate {
		return this.plate;
	}

	public setPlate(plate: Plate): void {
		this.plate = plate;
	}
}

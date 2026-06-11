export class Plate {
	private plateModel: Model;
	private player: Player;
	private currentScale: number;
	private orginalScale: number;

	constructor(plateModel: Model, player: Player) {
		this.plateModel = plateModel;
		this.player = player;
		this.currentScale = 1;
		this.orginalScale = 15;
	}

	public getPlayer(): Player {
		return this.player;
	}
	public getModel(): Model {
		return this.plateModel;
	}

	public getScale(): number {
		return this.currentScale;
	}

	public setScale(newScale: number) {
		if (newScale < 0) {
			this.currentScale = 0;
		} else {
			this.currentScale = newScale;
		}
	}
	public getOriginalScale(): number {
		return this.orginalScale;
	}

	public getRandomPointOnPlate(): Vector3 {
		const position = this.plateModel.PrimaryPart?.Position;
		const size = this.plateModel.PrimaryPart?.Size;

		if (position && size) {
			const randomX = (math.random() - 0.5) * size.X;
			const randomZ = (math.random() - 0.5) * size.Z;

			return new Vector3(position.X + randomX, position.Y + size.Y / 2, position.Z + randomZ);
		}
		return Vector3.one;
	}

	public destroyPlate(): void {
		this.plateModel.Destroy();
	}
}

import { Plate } from "shared/plate";
import { GameEvents } from "shared/gameEvents";
import { Players, Workspace, ServerStorage, Teams } from "@rbxts/services";
import { PlateGrid } from "shared/plateGrid";
import { lobbyTeam, playingTeam } from "./teams";

class PlateService {
	private grid: PlateGrid;
	private platePrefab = ServerStorage.WaitForChild("BasicPlate") as Model;
	private activePlates: Plate[];

	constructor() {
		const gridStartPosition = Workspace.WaitForChild("GridStartPosition") as BasePart;

		this.grid = new PlateGrid(gridStartPosition, 4, 4, 30);
		this.activePlates = [];
	}

	public createGridObjects(): void {
		this.grid.createGridObjects();
		print("Created grid objects");
	}

	public createPlates(): void {
		for (const player of Players.GetPlayers()) {
			if (player.Team !== lobbyTeam) continue;

			const plateModel = this.platePrefab.Clone();
			plateModel.Parent = Workspace;

			print("Added " + player.Name + " to plate");
			const plate = new Plate(plateModel, player);

			const platePos = this.grid.getRandomGridPosition();

			const gridObject = this.grid.getPlateGridObjectAtGridPosition(platePos.X, platePos.Y);
			gridObject?.setPlate(plate);

			if (!gridObject) continue;

			const worldPos = this.grid.getWorldPositionFromPlateGridObject(gridObject);

			plateModel.PivotTo(new CFrame(worldPos));

			this.activePlates.push(plate);
		}
	}

	public getGrid(): PlateGrid {
		return this.grid;
	}

	public getActivePlates(): Plate[] {
		return this.activePlates;
	}

	public getRandomActivePlate(): Plate {
		return this.activePlates[math.random(0, this.activePlates.size() - 1)];
	}

	public removeActivePlate(player: Player) {
		for (let i = 0; i < this.activePlates.size(); i++) {
			if (player === this.activePlates[i].getPlayer()) {
				this.activePlates[i].destroyPlate();
				this.activePlates.remove(i);
				break;
			}
		}
	}

	public clearAllPlates() {
		for (let i = 0; i < this.activePlates.size(); i++) {
			const plate = this.activePlates[i];
			const player = plate.getPlayer();
			this.removeActivePlate(player);
		}
		this.getGrid().clearGridObjects();
	}
}

export = new PlateService();

import { IntermissionGameState } from "./IntermissionGameState";
import { InRoundGameState } from "./InRoundGameState";
import { BaseGameState } from "./BaseGameState";
import Signal from "@rbxts/signal";
import Remotes from "shared/remotes";
import { GameStateType } from "./GameStateType";
import { WaitingForPlayersGameState } from "./WaitingForPlayersState";
import { Signals } from "shared/signals";
import { RoundOverGameState } from "./RoundOverGameState";

export class GameStateMachine {
	OnGameStateChanged = new Signal<(newState: BaseGameState) => void>();
	private currentGameState: BaseGameState;
	private waitingForPlayersState: WaitingForPlayersGameState;
	private intermissionState: IntermissionGameState;
	private inRoundState: InRoundGameState;
	private roundOverState: RoundOverGameState;
	private intermissionTime: number;

	constructor() {
		this.waitingForPlayersState = new WaitingForPlayersGameState(this);
		this.intermissionState = new IntermissionGameState(this);
		this.inRoundState = new InRoundGameState(this);
		this.roundOverState = new RoundOverGameState(this);
		this.currentGameState = undefined as any;
		this.intermissionTime = 3;
		this.start();
	}

	public start(): void {
		print("start");
		this.tryTransitionToNextState(this.waitingForPlayersState);
		Remotes.Server.Get("OnGameStateChanged").SendToAllPlayers(this.getCurrentStateType(), 5);
	}

	public update(dt: number): void {
		if (!this.currentGameState) return;
		//print("state changed to " + this.getCurrentStateType());

		this.currentGameState.onUpdate(dt);
		this.tryTransitionToNextState(this.currentGameState.getNextState());
	}

	private tryTransitionToNextState(newState: BaseGameState): boolean {
		if (this.currentGameState === undefined || this.currentGameState !== newState) {
			if (this.currentGameState !== undefined) {
				this.currentGameState.onExit();
			}
			this.currentGameState = newState;
			this.OnGameStateChanged.Fire(this.currentGameState);
			Remotes.Server.Get("OnGameStateChanged").SendToAllPlayers(this.getCurrentStateType(), 5);
			Signals.OnGameStateChanged.Fire(this.getCurrentStateType());
			this.currentGameState.onEnter();
		}
		return true;
	}

	public getWaitingForPlayersGameState() {
		return this.waitingForPlayersState;
	}

	public getIntermissionGameState(): IntermissionGameState {
		return this.intermissionState;
	}
	public getInRoundState(): InRoundGameState {
		return this.inRoundState;
	}
	public getIntermissionTime(): number {
		return this.intermissionTime;
	}
	public getRoundOverState(): RoundOverGameState {
		return this.roundOverState;
	}

	public getCurrentStateType(): GameStateType {
		return this.currentGameState.getType();
	}
}

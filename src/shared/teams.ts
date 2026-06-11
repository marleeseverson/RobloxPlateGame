// shared/Teams.ts
import { Teams } from "@rbxts/services";

const lobbyTeam = new Instance("Team");
lobbyTeam.Parent = Teams;
lobbyTeam.Name = "Lobby";
lobbyTeam.TeamColor = BrickColor.Blue();
lobbyTeam.AutoAssignable = true;

const playingTeam = new Instance("Team");
playingTeam.Parent = Teams;
playingTeam.Name = "Playing";
playingTeam.TeamColor = BrickColor.Red();

export { playingTeam, lobbyTeam };

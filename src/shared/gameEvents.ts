const OnIntermissionTimerFinished = new Instance("BindableEvent");
const OnSecondPassed = new Instance("BindableEvent");
const OnInRoundStateEntered = new Instance("BindableEvent");
const OnTeleportPlayersToPlayArea = new Instance("BindableEvent");
const OnPlayersAddedToPlayingTeam = new Instance("BindableEvent");
const OnPlayerPlatesCreated = new Instance("BindableEvent");

export const GameEvents = {
	OnIntermissionTimerFinished,
	OnSecondPassed,
	OnInRoundStateEntered,
	OnTeleportPlayersToPlayArea,
	OnPlayersAddedToPlayingTeam,
	OnPlayerPlatesCreated,
};

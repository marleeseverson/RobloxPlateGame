import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import TextLabel from "shared/UI/TextLabel";
import RoundEvents from "shared/UI/RoundEvents";
import ItemInventory from "shared/UI/ItemInventory";

const Players = game.GetService("Players");
const player = Players.LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.Name = "ReactGui";
screenGui.ResetOnSpawn = false; // keeps UI alive on respawn
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
screenGui.Parent = playerGui;
screenGui.IgnoreGuiInset = true;

const root = createRoot(screenGui);
root.render(
	<>
		<TextLabel text="Hello" />
		<RoundEvents />
		<ItemInventory />
	</>,
);

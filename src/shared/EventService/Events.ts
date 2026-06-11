import { PlateRiseEvent } from "shared/Events/PlateRiseEvent";
import { PlateShrinkEvent } from "shared/Events/PlateShrinkEvent";
import { SpawnCactusEvent } from "shared/Events/SpawnCactusEvent";

const plateShrinkEvent = new PlateShrinkEvent(2);
const plateRiseEvent = new PlateRiseEvent(7);
const spawnCactusEvent = new SpawnCactusEvent();

export const Events = [spawnCactusEvent];

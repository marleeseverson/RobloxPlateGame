import { PlateRiseEvent } from "shared/Events/PlateRiseEvent";
import { PlateShrinkEvent } from "shared/Events/PlateShrinkEvent";
import { SpawnCactusEvent } from "shared/Events/SpawnCactusEvent";
import { SpawnEnemy } from "shared/Events/SpawnEnemy";

const plateShrinkEvent = new PlateShrinkEvent(2);
const plateRiseEvent = new PlateRiseEvent(7);
const spawnCactusEvent = new SpawnCactusEvent();
const spawnEnemyEvent = new SpawnEnemy();

export const Events = [spawnCactusEvent, plateRiseEvent, plateShrinkEvent, spawnEnemyEvent];

import { PlateGrowEvent } from "shared/Events/PlateGrowEvent";
import { PlateRiseEvent } from "shared/Events/PlateRiseEvent";
import { PlateShrinkEvent } from "shared/Events/PlateShrinkEvent";
import { PlateSphere } from "shared/Events/PlateSphere";
import { PlateStretchEvent } from "shared/Events/PlateStretchEvent";
import { PlateTrampolineEvent } from "shared/Events/PlateTrampolineEvent";
import { RotatePlateOnceEvent } from "shared/Events/RotatePlateOnce";
import { SpawnCactusEvent } from "shared/Events/SpawnCactusEvent";
import { SpawnEnemy } from "shared/Events/SpawnEnemy";
import { SpawnTreeEvent } from "shared/Events/SpawnTreeEvent";

const plateShrinkEvent = new PlateShrinkEvent(2);
const plateRiseEvent = new PlateRiseEvent(7);
const spawnCactusEvent = new SpawnCactusEvent();
const spawnEnemyEvent = new SpawnEnemy();
const makePlateSphere = new PlateSphere(3);
const rotateOnceEvent = new RotatePlateOnceEvent();
const plateStretch = new PlateStretchEvent();
const plateGrowEvent = new PlateGrowEvent(3);
const trampolineEvent = new PlateTrampolineEvent();
const spawnTreeEvent = new SpawnTreeEvent();

export const Events = [spawnTreeEvent, plateGrowEvent];

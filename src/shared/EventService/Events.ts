import { PlateRiseEvent } from "shared/Events/PlateRiseEvent";
import { PlateShrinkEvent } from "shared/Events/PlateShrinkEvent";

const plateShrinkEvent = new PlateShrinkEvent(2);
const plateRiseEvent = new PlateRiseEvent(7);

export const Events = [plateShrinkEvent, plateRiseEvent];

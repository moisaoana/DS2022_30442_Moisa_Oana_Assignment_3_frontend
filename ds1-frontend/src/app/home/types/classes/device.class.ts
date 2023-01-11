import {Measurement} from "./measurement.class";
import {User} from "./user.class";


export class Device{
  id?: number;
  name?: string;
  description?: string;
  address?: string;
  maxHourlyEnergyConsumption?: number;
  userId?: number;
  user?: User;
  measurements?: Measurement[];
}

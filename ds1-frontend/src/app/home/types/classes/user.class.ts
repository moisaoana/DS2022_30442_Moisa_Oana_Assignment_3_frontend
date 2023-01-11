import {Device} from "./device.class";

export class User{
  id?: number;
  name?: string;
  username: string;
  password?: string;
  role?: string;
  devices?: Device[];
}

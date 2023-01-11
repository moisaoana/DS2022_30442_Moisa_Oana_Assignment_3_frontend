import {UserRepository} from "./user.repository";
import {DeviceRepository} from "./device.repository";

export const repositories = [UserRepository, DeviceRepository];

export * from './user.repository';
export * from './device.repository';

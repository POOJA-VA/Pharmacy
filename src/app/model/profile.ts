import { Address } from "./address";

export interface Profile {
    id: number;
    userId?:number;
    address: string;
    city: string;
    zipcode: number;
    addressList:Address[];
}

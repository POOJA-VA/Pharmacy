export interface Cart {
    id:number;
    title:string;
    image:File;
    price:number;
    quantity:number;
    total:number;
    userId: number;
    medicineId: number;
    count: number;
}
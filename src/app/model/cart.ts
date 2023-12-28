export interface Cart {
    id?: number;
    userId: number;
    medicineId: number;
    // cartId?: number;
    count: number;
    price?:number;
    title?:string;
    medicine?: {
      id: number;
      title: string;
      description: string;
      price: number;
      count: number;
      photo: string | null;
      createdAt: string;
    };
}
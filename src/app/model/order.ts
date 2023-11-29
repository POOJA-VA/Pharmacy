export interface Order {
    id: number;
    date?: Date;
    title?: String; 
    total: number;
    username: String;
    addressId?: number;
    createdAt?: Date;
    orderedMedicineList: {
      id?: number;
      title: String;
      description?: String;
      price: number;
      count: number;
    }[];
  }
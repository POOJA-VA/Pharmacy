export interface Product {
    id: number;
  userId?:number;
  categoryId?:number;
  title: String;
  description: String;
  price: number;
  image?:null;
  date: string;
  expirydate: string; 
}
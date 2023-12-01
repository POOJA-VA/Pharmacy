export interface Product {
  id: number;
  userId?:number;
  categoryId:number;
  title: string;
  description: string;
  price: number;
  photo:string;
  date: string;
  expirydate: string; 
}

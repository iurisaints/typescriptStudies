export interface BasicProduct {
    id: number;
  }
  
export interface Product extends BasicProduct {
    name: string;
    description: string;
    instockQuantity: number;
    price: number;
}
export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  stock: number;

  constructor(name: string, price: number, description: string, stock: number) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
  }

  validate(): boolean {
    return (
      this.name?.trim().length > 0 &&
      this.price > 0 &&
      this.description?.trim().length > 0 &&
      this.stock >= 0
    );
  }
}

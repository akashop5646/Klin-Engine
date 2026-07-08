export interface ProductDto {
  id: string;
  title: string;
  price: number;
  currency: string;
  available: boolean;
  images: string[];
}

export interface CollectionDto {
  id: string;
  title: string;
  handle: string;
  productsCount: number;
}

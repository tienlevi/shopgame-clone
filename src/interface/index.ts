interface Product {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  category?: string;
}

export interface OrderItems {
  _id: string;
  items: [{ name: string; price: number; img: string; category: string }];
  status: string;
  totalPrice: number;
  userInfo: {
    _id: string;
    name: string;
    email: string;
    address: string;
    tel: string;
  };
  createdAt: string;
}

export default Product;

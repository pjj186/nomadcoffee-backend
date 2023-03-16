import { Category, CoffeeShopPhoto, User } from "@prisma/client";
import { gql } from "apollo-server-express";

export interface ICoffeeShop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: User;
  categories: Category[];
  photos: CoffeeShopPhoto[];
  createdAt: string;
  updatedAt: string;
}

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    categories(lastId: Int): [Category]
    photos(lastId: Int): [CoffeeShopPhoto]
    createdAt: String!
    updatedAt: String!
  }

  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
`;

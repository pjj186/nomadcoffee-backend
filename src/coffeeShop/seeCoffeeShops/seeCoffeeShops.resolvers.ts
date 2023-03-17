import client from "../../client";
import { ILastId } from "../../users/users.resolvers";

export default {
  Query: {
    seeCoffeeShops: (_: any, { lastId }: ILastId) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

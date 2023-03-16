import { CoffeeShop } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_: any, { id }: CoffeeShop) =>
      client.coffeeShop.findUnique({
        where: {
          id,
        },
      }),
  },
};

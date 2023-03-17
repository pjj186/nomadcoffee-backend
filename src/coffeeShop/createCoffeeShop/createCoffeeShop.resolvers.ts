import client from "../../client";
import { FileUpload } from "../../shared/shared.types";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";
import { ICoffeeShop } from "../coffeeShop.typeDefs";
import { handleFile, processCategory } from "../coffeeShop.utiles";

export interface ICoffeeShopArgs extends ICoffeeShop {
  file: FileUpload;
  category: string;
}

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _: any,
        { name, latitude, longitude, file, category }: ICoffeeShopArgs,
        { loggedInUser }: Context
      ) => {
        try {
          const shop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser?.id,
                },
              },
              categories: {
                connectOrCreate: processCategory(category),
              },
            },
          });
          if (file) {
            const phtoUrl = await handleFile(file, loggedInUser?.id!);
            await client.coffeeShopPhoto.create({
              data: {
                url: phtoUrl,
                shop: {
                  connect: {
                    id: shop.id,
                  },
                },
              },
            });
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
};

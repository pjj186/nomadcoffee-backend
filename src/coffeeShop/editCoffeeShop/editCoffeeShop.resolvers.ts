import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";
import { handleFile, processCategory } from "../coffeeShop.utiles";
import { ICoffeeShopArgs } from "../createCoffeeShop/createCoffeeShop.resolvers";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _: any,
        { id, name, latitude, longitude, file, category }: ICoffeeShopArgs,
        { loggedInUser }: Context
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!shop) {
          return {
            ok: false,
            error: "Cannot find coffee shop.",
          };
        }
        try {
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(category && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: processCategory(category),
                },
              }),
            },
          });
          if (file) {
            const photoUrl = await handleFile(file, loggedInUser?.id!);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id,
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

import client from "../../client";
import errorMessages from "../../error-messages";
import { Context } from "../types";
import { IUser } from "../users.types";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_: any, { username }: IUser, { loggedInUser }: Context) => {
        const ok = await client.user.findUnique({
          where: { username },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: errorMessages.UserNotFound,
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

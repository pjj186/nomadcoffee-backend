import client from "../../client";
import errorMessages from "../../error-messages";
import { Context } from "../types";
import { IUser } from "../users.types";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    toggleFollow: protectedResolver(
      async (_: any, { username }: IUser, { loggedInUser }: Context) => {
        const exist = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!exist) {
          return {
            ok: false,
            error: errorMessages.UserNotFound,
          };
        }
        // 해당 유저를 내가 팔로우중인지 확인
        const currentFollowing = await client.user.findFirst({
          where: {
            id: loggedInUser?.id,
            following: {
              some: {
                username,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!currentFollowing) {
          // 팔로우중이 아니라면 팔로우
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
        } else {
          // 이미 팔로우중이라면 팔로우 해제
          await client.user.update({
            where: {
              id: loggedInUser?.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

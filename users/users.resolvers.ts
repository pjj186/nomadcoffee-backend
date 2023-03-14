import client from "../client";
import { Context } from "./types";
import { IUser } from "./users.types";

interface ILastId {
  lastId: number;
}

export default {
  User: {
    followers: ({ id }: IUser, { lastId }: ILastId) =>
      client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    following: ({ id }: IUser, { lastId }: ILastId) =>
      client.user.findMany({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    totalFollowers: ({ id }: IUser) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowing: ({ id }: IUser) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    isFollowing: async ({ id }: IUser, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      }
      const exist = await client.user.count({
        where: {
          followers: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      return Boolean(exist);
    },
    isMe: async ({ id }: IUser, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};

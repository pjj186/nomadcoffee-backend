import client from "../../client";
import { IUser } from "../users.types";

interface IFollowArgs {
  page: number;
}

export default {
  Query: {
    seeProfile: async (_: any, { username }: IUser) => {
      return client.user.findUnique({
        where: {
          username,
        },
      });
    },
  },

  User: {
    following: async ({ id }: IUser) => {
      return client.user.findMany({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    followers: async ({ id }: IUser) => {
      return client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};

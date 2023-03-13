import client from "../../client";

interface ISearchParam {
  keyword: string;
  page: number;
}

interface IFollowParam {
  page: number;
}

export default {
  Query: {
    searchUsers: async (_: any, { keyword, page }: ISearchParam) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 4,
        skip: (page - 1) * 4,
      });
      return users;
    },
  },
};

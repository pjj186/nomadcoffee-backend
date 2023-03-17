import client from "../../client";

interface ISearchParam {
  keyword: string;
  page: number;
}

export default {
  Query: {
    searchUsers: async (_: any, { keyword, page }: ISearchParam) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword,
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalResults = await client.user.count({
        where: { username: { startsWith: keyword } },
      });
      return {
        users,
        totalPages: Math.ceil(totalResults / 5),
      };
    },
  },
};

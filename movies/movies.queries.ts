import client from "../client";
import { IMovie } from "./movies.typeDefs";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: IMovie) =>
      client.movie.findUnique({ where: { id } }),
  },
};

import client from "../client";
import { IMovie } from "./movies.typeDefs";

export default {
  Mutation: {
    createMovie: (_: any, { title, year, genre }: IMovie) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: IMovie) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: any, { id, year }: IMovie) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};

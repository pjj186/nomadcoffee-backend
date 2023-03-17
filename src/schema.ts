import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

// Pattern Language, Glob
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{js,ts}`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);

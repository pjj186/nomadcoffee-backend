require("dotenv").config();
import { ApolloServer, ExpressContext } from "apollo-server-express";
import express from "express";
import http from "http";
import { resolvers, typeDefs } from "./schema";
import logger from "morgan";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx: ExpressContext) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization!),
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
const httpServer = http.createServer(app);

apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});

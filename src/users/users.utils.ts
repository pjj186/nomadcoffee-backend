import { GraphQLResolveInfo } from "graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";
import { Context } from "./types";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = <JwtPayload>(
      await jwt.verify(token, process.env.JWT_SECRET_KEY!)
    );
    const user = await client.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: any) =>
  (root: any, args: any, context: Context, info: GraphQLResolveInfo) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        // query protect
        return null;
      } else {
        // mutation protect
        return {
          ok: false,
          error: "로그인이 필요합니다.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };

import { IUser } from "../users.types";
import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { username, email, name, password }: IUser
    ) => {
      try {
        // Exist User Check
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const cryptedPassword = await bcrypt.hash(password, 10);
        // create Account
        await client.user.create({
          data: {
            username,
            email,
            name,
            password: cryptedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't Create Acccount.",
        };
      }
    },
  },
};

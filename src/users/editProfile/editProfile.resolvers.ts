import bcrypt from "bcrypt";
import client from "../../client";
import { Context } from "../types";
import { IUser } from "../users.types";
import { protectedResolver } from "../users.utils";
import fs from "fs";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _: any,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        }: IUser,
        { loggedInUser }: Context
      ) => {
        let newAvatarUrl = null;
        if (avatarURL) {
          const { filename, createReadStream } = await avatarURL;
          const newFilename = `${loggedInUser?.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            process.cwd() + "/uploads/" + filename
          );
          readStream.pipe(writeStream);
          newAvatarUrl = `http://localhost:4000/static/${newFilename}`;
        }
        let cryptedPassword = null;
        if (newPassword) {
          cryptedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            ...(cryptedPassword && { password: cryptedPassword }),
            ...(newAvatarUrl && { avatarURL: newAvatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "프로필을 업데이트 할 수 없습니다.",
          };
        }
      }
    ),
  },
};

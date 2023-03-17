import { User } from "@prisma/client";
import { FileUpload } from "../shared/shared.types";

export interface IUser {
  id: number;
  username: string;
  email: string;
  name: string;
  location: string;
  password: string;
  avatarURL: FileUpload;
  following: User[];
  followers: User[];
  githubUsername: string;
  createdAt: string;
  updatedAt: string;
}

import { User } from "@prisma/client";
import { ReadStream, WriteStream } from "fs";

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

interface ExtendedReadStream extends ReadStream {
  _writeStream: WriteStream;
}

export interface FileUpload {
  createReadStream(): ExtendedReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}

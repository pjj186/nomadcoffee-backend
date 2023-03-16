import { ReadStream, WriteStream } from "fs";

interface ExtendedReadStream extends ReadStream {
  _writeStream: WriteStream;
}

export interface FileUpload {
  createReadStream(): ExtendedReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}

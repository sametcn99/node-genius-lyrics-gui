// types/ffmetadata.d.ts
declare module "ffmetadata" {
  export function setFfmpegPath(path: string): void;
  export function read(
    src: string,
    options: any,
    callback: (err: Error, data: any) => void
  ): void;
  export function write(
    src: string,
    data: any,
    options: any,
    callback: (err: Error) => void
  ): void;
}

export {};

declare global {
  namespace Express {
    interface Request {
      t: Function;
      session: any;
    }
  }
}
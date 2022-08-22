export {};

declare global {
  namespace Express {
    interface Request {
      t: function;
      session: any;
    }
  }
}
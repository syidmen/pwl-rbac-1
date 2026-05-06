import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role_id: number;
        username: string;
        permissions: string[];
      };
    }
  }
}

export {};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TokenPayload {
  userId: number;
  exp: number;
}

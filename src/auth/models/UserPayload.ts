export interface UserPayload {
  sub: string;
  email: string;
  userName: string;
  iat?: number;
  exp?: number;
}

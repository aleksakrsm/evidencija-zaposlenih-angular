export type AuthenticatingUser = {
  username: string;
  password:string;
}
export type RegistratingUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password:string;
}
export type UserToken = {
  token:string;
}
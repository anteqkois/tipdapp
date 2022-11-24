export {};

declare global {
  type DecodedUser = {
    address: string;
    nick: string;
    roles: string[];
  };
}

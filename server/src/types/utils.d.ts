export {};

declare global {
  type decodedJWT = {
    metadata: { address: string; nick: string };
    roles: string[];
  };
}

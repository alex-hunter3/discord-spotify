export default interface Client {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot: boolean;
}

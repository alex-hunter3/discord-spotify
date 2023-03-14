import { User } from "discord.js";
import SpotifyCredentials from "src/interfaces/spotify";
import ClientInterface from "../interfaces/client";

class Client {
  private _id: string;
  private _discriminator: string;
  private _username: string;
  private _avatar: string | null;
  private _bot: boolean;
  private _spotify: SpotifyCredentials | null;

  constructor(user: ClientInterface) {
    this._id = user.id;
    this._username = user.username;
    this._discriminator = user.discriminator;
    this._avatar = user.avatar;
    this._bot = user.bot;
    this._spotify = null;
  }

  getSpotifyOauthUrl(): string {
    return `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=${process.env.SPOTIFY_SCOPES}`;
  }

  get user(): User {
    return {
      id: this._id,
      username: this._username,
      discriminator: this._discriminator,
      avatar: this._avatar,
      bot: this._bot,
    } as User;
  }
}

export default Client;

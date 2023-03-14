import { v4 as uuidv4 } from "uuid";
import ClientInterface from "src/interfaces/client.js";
import Client from "./Client.js";

export default class Room {
  private _id: string;
  private _owner: Client;
  private _server: string;
  private _channel: string;
  private _blockedUsers: Client[];

  constructor(owner: ClientInterface, server: string, channel: string) {
    this._id = uuidv4();
    this._owner = new Client(owner);
    this._server = server;
    this._channel = channel;
    this._blockedUsers = [];
  }

  getId(): string {
    return this._id;
  }

  get owner(): Client {
    return this._owner;
  }

  get channel(): string {
    return this._channel;
  }

  get server(): string {
    return this._server;
  }

  get blockedUsers(): Client[] {
    return this._blockedUsers;
  }
}

import ClientInterface from "../interfaces/client.js";
import Room from "../lib/Room.js";

class Manager {
  private _rooms: Room[];

  constructor() {
    this._rooms = [];
  }

  public createRoom(owner: ClientInterface, server: string, channel: string): Room {
    const newRoom = new Room(owner, server, channel);

    console.log(newRoom);

    this._rooms.push(newRoom);

    return newRoom;
  }

  public getRoom(id: string): Room | null {
    return this._rooms.find((room) => room.id === id) || null;
  }

  public removeRoom(id: string): void {
    this._rooms = this._rooms.filter((room) => room.id !== id);
  }
}

export default new Manager();

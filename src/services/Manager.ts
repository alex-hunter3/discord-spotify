import ClientInterface from "../interfaces/client.js";
import Room from "../lib/Room.js";
import client from "../services/redis.js";

class Manager {
  constructor() {}

  public async createRoom(
    owner: ClientInterface,
    server: string,
    channel: string
  ): Promise<Room> {
    let newRoom = new Room(owner, server, channel);

    // check if room already exists to avoid overwriting
    while (await client.exists(newRoom.getId())) {
      newRoom = new Room(owner, server, channel);
    }

    // insert room into redis database
    client.set(newRoom.getId(), JSON.stringify(newRoom));

    return newRoom;
  }

  public async getRoom(id: string): Promise<Room | null> {
    const room = await client.get(id);
    return room ? JSON.parse(room) : null;
  }

  public async removeRoom(id: string): Promise<void> {
    await client.del(id);
  }
}

export default new Manager();

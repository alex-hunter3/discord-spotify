import {
  Client,
  ClientOptions,
  Events,
  Message,
  TextChannel,
} from "discord.js";
import manager from "./Manager.js";
import credentials from "../data/credentials.json" assert { type: "json" };

export default class Bot extends Client {
  constructor(options: ClientOptions) {
    super(options);
    this.setEventListeners();
  }

  private setEventListeners() {
    this.once(Events.ClientReady, (client: Client) => {
      console.log(`[STATUS] ${client.user?.username} is running!`);
    });

    this.on(Events.MessageCreate, this.handleMessage);
  }

  private async handleMessage(msg: Message): Promise<void> {
    if (msg.author.bot || msg.author.id === this.user?.id) return;

    console.log(
      `[${msg.author.username}#${msg.author.discriminator}]: ${msg.content}`
    );

    const prompt = this.getPrompt(msg);
    if (!prompt) return;

    const channel = await this.channel(msg.channel.id);

    switch (prompt) {
      case "ping":
        channel?.send("Pong!");
        break;
      case "help":
        channel?.send(
          "Commands:\n\n`!vibez help` - Shows this message.\n`!vibez ping` - Pong!\n`!vibez createroom` - Creates a room.\n`!vibez joinroom` - Joins a room."
        );
        break;
      case "createroom":
        manager.createRoom(
          {
            id: msg.author.id,
            username: msg.author.username,
            discriminator: msg.author.discriminator,
            avatar: msg.author.avatar,
            bot: msg.author.bot,
          },
          msg.guild?.id as string,
          msg.channel.id
        );

        channel?.send(
          `Room created!\n\nOwner: ${msg.author.username}#${msg.author.discriminator}\nServer: ${msg.guild?.name}\nChannel: ${channel?.name}`
        );
        break;
      case "joinroom":
        // const room = manager.getRoom("test");
        break;
      default:
        channel?.send("Invalid command! Type `!vibez help` for more info.");
        break;
    }
  }

  private canJoinRoom(msg: Message): boolean {
    return true;
  }

  private canCreateRoom(msg: Message): boolean {
    return true;
  }

  private async channel(channelId: string): Promise<TextChannel | null> {
    const channel = await this.channels.fetch(channelId);
    return channel ? (channel as TextChannel) : null;
  }

  private getPrompt(msg: Message): string | null | undefined {
    const message = msg.content.toLowerCase().trim().split(" ");

    if (message[0] === "!vibez") {
      return message.slice(1).join(" ");
    }

    return null;
  }

  async start() {
    await this.login(credentials.DISCORD_SECRET_KEY);
    console.log("[STATUS] Bot logged in!");
    console.log(
      `[STATUS] Invite bot using this link: ${credentials.DISCORD_BOT_INVITE_LINK}`
    );
  }
}

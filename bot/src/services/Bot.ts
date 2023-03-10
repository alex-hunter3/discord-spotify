import {
  Client,
  ClientOptions,
  Events,
  Message,
  TextChannel,
} from "discord.js";
import manager from "./Manager.js";

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
      case "help":
        (await this.channel(msg.channel.id))?.send("Help message here!");
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

        (await this.channel(msg.channel.id))?.send(
          `Room created!\n\nOwner: ${msg.author.username}#${msg.author.discriminator}\nServer: ${msg.guild?.name}\nChannel: ${channel?.name}`
        );
        break;
      case "joinroom":
        const room = manager.getRoom("test");

      default:
        (await this.channel(msg.channel.id))?.send(
          "Invalid command! Type `!help` for more info."
        );
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
    await this.login(process.env.DISCORD_SECRET_KEY);
    console.log("[STATUS] Bot logged in!");
    console.log(
      `[STATUS] Invite bot using this link: ${process.env.DISCORD_BOT_INVITE_LINK}`
    );
  }
}

import {
  Client,
  ClientOptions,
  Events,
  GatewayIntentBits,
  Message,
} from "discord.js";
import { config } from "dotenv";

config();

console.log("[STATUS] Starting bot...");

class Bot extends Client {
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

  private handleMessage(msg: Message): void {
    if (msg.author.bot || msg.author.id === this.user?.id) return;

    console.log(
      `[${msg.author.username}#${msg.author.discriminator}]: ${msg.content}`
    );
  }

  async start() {
    await this.login(process.env.DISCORD_SECRET_KEY);
    console.log("[STATUS] Bot logged in!");
    console.log(
      `[STATUS] Invite bot using this link: ${process.env.DISCORD_BOT_INVITE_LINK}`
    );
  }
}

const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.start();

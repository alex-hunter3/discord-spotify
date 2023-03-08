import { Client, ClientOptions } from "discord.js";
import { config } from "dotenv";

config();

console.log("[STATUS] Starting bot...");

class Bot extends Client {
  constructor(options: ClientOptions) {
    super(options);
  }

  async start() {
    await this.login(process.env.DISCORD_SECRET_KEY);
    console.log("[STATUS] Bot started!");
  }
}

const bot = new Bot({
  intents: [],
});

bot.start();

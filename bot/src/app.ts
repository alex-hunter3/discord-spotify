import { GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import Bot from "./services/Bot.js";

config();

console.log("[STATUS] Starting bot...");

const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.start();

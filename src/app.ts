import Bot from "./services/Bot.js";
import { GatewayIntentBits } from "discord.js";

console.log("[STATUS] Starting bot...");

const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.start();

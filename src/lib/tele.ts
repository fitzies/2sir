import { Bot } from "grammy";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

const sendMessage = async (chatId: string, message: string) => {
  return (await bot.api.sendMessage(chatId, message)).message_id;
};

export { sendMessage };

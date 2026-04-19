import type { BotHandler } from "../bot-dispatcher.js";

export const homeQuestionHandler: BotHandler = async ({ inbound, messageSender }) => {
  if (inbound.text === "Tá em casa?" && inbound.fromMe === false && inbound.isPrivateChat) {
    await messageSender.sendText({
      instance: inbound.instance,
      to: inbound.replyDestination,
      text: "Tó pode vir",
    });
    return true;
  }
  return false;
};

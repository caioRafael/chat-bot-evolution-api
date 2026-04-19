import type { BotHandler } from "../bot-dispatcher.js";

export const oiFromMeHandler: BotHandler = async ({ inbound, messageSender }) => {
  if ((inbound.text === "Oi" || inbound.text === "oi") && inbound.fromMe === true && inbound.isPrivateChat) {
    await messageSender.sendText({
      instance: inbound.instance,
      to: inbound.replyDestination,
      text: "Oi, tudo bem? Sou o bot do WhatsApp. Como posso ajudar você hoje?",
    });
    return true;
  }
  return false;
};

import type { Request, Response } from "express";
import type { MessageReceivedData } from "../interface/message-data-type.js";
import { EvolutionMessageSender } from "../adapters/evolution-message-sender.js";
import { TenantConfigResolver } from "../config/tenant-config-resolver.js";
import { BotDispatcher, type BotHandler } from "../bot/bot-dispatcher.js";
import { createDefaultBotHandlers } from "../bot/default-handlers.js";
import type { MessageSender } from "../ports/message-sender.js";
import { mapWebhookToInbound } from "../inbound/map-webhook-to-inbound.js";

export class MessagesUpsertService {
  private readonly messageSender: MessageSender;
  private readonly botDispatcher: BotDispatcher;

  constructor(
    tenantConfigResolver = new TenantConfigResolver(),
    messageSender: MessageSender = new EvolutionMessageSender(tenantConfigResolver),
    botHandlers: BotHandler[] = createDefaultBotHandlers(),
  ) {
    this.messageSender = messageSender;
    this.botDispatcher = new BotDispatcher(botHandlers);
  }

  async execute(request: Request, response: Response) {
    const body = request.body as MessageReceivedData;
    const inbound = mapWebhookToInbound(body);

    if (!inbound) {
      console.log("[MESSAGES UPSERT SERVICE] Payload inválido ou sem instance/remoteJid.");
      return response.status(200).json({ ok: true, ignored: true, reason: "invalid_payload" });
    }

    console.log(`[MESSAGES UPSERT SERVICE] Message: \n${JSON.stringify(inbound.text, null, 2)}`);

    await this.botDispatcher.dispatch({
      inbound,
      messageSender: this.messageSender,
    });

    console.log(`[MESSAGES UPSERT SERVICE] Evento recebido: \n${JSON.stringify(body, null, 2)}`);
    return response.status(200).json({ message: "Messages upserted successfully" });
  }
}

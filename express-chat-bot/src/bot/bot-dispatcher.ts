import type { InboundChatMessage } from "../inbound/inbound-chat-message.js";
import type { MessageSender } from "../ports/message-sender.js";

export interface BotContext {
  inbound: InboundChatMessage;
  messageSender: MessageSender;
}

/** Retorna true se o handler consumiu o evento (demais handlers não rodam). */
export type BotHandler = (ctx: BotContext) => Promise<boolean>;

export class BotDispatcher {
  constructor(private readonly handlers: BotHandler[]) {}

  async dispatch(ctx: BotContext): Promise<void> {
    for (const handler of this.handlers) {
      if (await handler(ctx)) {
        return;
      }
    }
  }
}

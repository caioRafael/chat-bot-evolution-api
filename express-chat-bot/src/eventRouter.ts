import type { Request, Response } from "express";
import { QrcodeUpdateService } from "./services/qrcode-update-service.js";
import { MessagesUpsertService } from "./services/messages-upsert-service.js";
import { ConnectionUpdateService } from "./services/connection-update-service.js";

type WebhookHandler = {
  execute: (request: Request, response: Response) => Promise<unknown>;
};

function buildEventRegistry(): Map<string, WebhookHandler> {
  return new Map<string, WebhookHandler>([
    ["qrcode.updated", new QrcodeUpdateService()],
    ["messages.upsert", new MessagesUpsertService()],
    ["connection.update", new ConnectionUpdateService()],
  ]);
}

const eventRegistry = buildEventRegistry();

export async function eventRouter(request: Request, response: Response) {
  const body = request.body as Record<string, unknown> | null | undefined;
  const event = typeof body?.event === "string" ? body.event : undefined;

  try {
    if (event) {
      const handler = eventRegistry.get(event);
      if (handler) {
        return await handler.execute(request, response);
      }
      console.log(`[EVENT ROUTER] Evento recebido sem handler dedicado: ${event}`);
    } else {
      console.log(`[EVENT ROUTER] Payload sem campo event: ${JSON.stringify(body)}`);
    }
    return response.status(200).json({ ok: true, ignored: true, event: event ?? null });
  } catch (error) {
    console.error("[EVENT ROUTER] Erro ao processar webhook:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

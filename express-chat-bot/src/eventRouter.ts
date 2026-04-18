import type { Request, Response } from "express";
import { QrcodeUpdateService } from "./services/qrcode-update-service.js";
import { MessagesUpsertService } from "./services/messages-upsert-service.js";

export async function eventRouter(request: Request, response: Response) {
  const body = request.body;
//   console.log(`[EVENT ROUTER] Evento recebido: \n${JSON.stringify(body, null, 2)}`);

  const qrcodeUpdateService = new QrcodeUpdateService();
  const messagesUpsertService = new MessagesUpsertService();

  if (body.event === "qrcode.updated") {
    return await qrcodeUpdateService.execute(request, response);
  } else if (body.event === "messages.upsert") {
    return await messagesUpsertService.execute(request, response);
  } else {
    return response.status(400).json({ error: "Invalid event" });
  }
}
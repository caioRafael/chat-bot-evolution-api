import type { Request, Response } from "express";
import type { MessageReceivedData } from "../interface/message-data-type.js";

export class MessagesUpsertService {
    async execute(request: Request, response: Response) {
        const body = request.body as MessageReceivedData;

        const message = body.data.message.conversation;
        const instance = body.instance;
        const number = body.sender;
        const mentionedDigits = number.split("@")[0] ?? number;

        if (message === "Iai fera") {
            const sendTextPayload: Record<string, unknown> = {
                number,
                text: "E aí! Qual linguagem de programação você prefere? (responde em texto mesmo)",
                delay: 123,
                linkPreview: true,
                mentionsEveryOne: true,
                mentioned: [mentionedDigits],
            };

            const quotedId = body.data.key?.id;
            if (quotedId) {
                sendTextPayload.quoted = {
                    key: { id: quotedId },
                    message: { conversation: message },
                };
            }

            fetch(`http://localhost:8080/message/sendText/${instance}`, {
                method: "POST",
                body: JSON.stringify(sendTextPayload),
                headers: {
                    "Content-Type": "application/json",
                    apikey: "e478c34e-d979-42d0-b2ee-7cb003e9a614",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(`[MESSAGES UPSERT SERVICE] Resposta da API: \n${JSON.stringify(data, null, 2)}`);
                })
                .catch((error) => {
                    console.error(`[MESSAGES UPSERT SERVICE] Erro ao enviar mensagem: \n${error}`);
                });
        }
        console.log(`[MESSAGES UPSERT SERVICE] Evento recebido: \n${JSON.stringify(body, null, 2)}`);
        return response.status(200).json({ message: "Messages upserted successfully" });
    }
}
import type { Request, Response } from "express";
import qrcode from "qrcode-terminal";

export class QrcodeUpdateService {
    async execute(request: Request, response: Response) {
        const data = request.body.data;
        const qrcodeString = data.qrcode.code;

        console.log(`[QRCODE UPDATE SERVICE] Evento recebido para a instancia: 
            \n\t ${data.qrcode.instance}`);
        qrcode.generate(qrcodeString, { small: true }, (qrcode) => {
            console.log(qrcode);
        });
        return response.status(200).json({ ok: true });
    }
}
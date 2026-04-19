import type { TenantConfigResolver } from "../config/tenant-config-resolver.js";
import type { MessageSender } from "../ports/message-sender.js";

export class EvolutionMessageSender implements MessageSender {
  constructor(private readonly tenantConfig: TenantConfigResolver) {}

  async sendText(params: { instance: string; to: string; text: string }): Promise<void> {
    const config = this.tenantConfig.resolve(params.instance);
    if (!config) {
      return;
    }

    const url = `${config.baseUrl}/message/sendText/${encodeURIComponent(params.instance)}`;
    const sendTextPayload: Record<string, unknown> = {
      number: params.to,
      text: params.text,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(sendTextPayload),
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
      });
      const data: unknown = await res.json();
      console.log(`[EVOLUTION MESSAGE SENDER] Mensagem enviada: \n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error(`[EVOLUTION MESSAGE SENDER] Erro ao enviar mensagem: \n${String(error)}`);
    }
  }
}

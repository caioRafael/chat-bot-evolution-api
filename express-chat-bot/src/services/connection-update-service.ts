import type { Request, Response } from "express";

export class ConnectionUpdateService {
  async execute(request: Request, response: Response) {
    const body = request.body as Record<string, unknown>;
    const instance = String(body.instance ?? "");
    const data = (body.data as Record<string, unknown> | undefined) ?? {};
    const state = String(data.state ?? body.state ?? "unknown");
    const statusReason = data.statusReason ?? body.statusReason;
    const wuid = data.wuid ?? body.wuid;
    const profileName = data.profileName ?? body.profileName;

    if (state === "open") {
      console.log(
        `[CONNECTION UPDATE] Instância "${instance}" conectada ao WhatsApp (wuid: ${String(wuid)}, nome: ${String(profileName)})`,
      );
    } else if (state === "close") {
      console.log(
        `[CONNECTION UPDATE] Instância "${instance}" desconectada (statusReason: ${String(statusReason ?? "n/a")})`,
      );
    } else {
      console.log(
        `[CONNECTION UPDATE] Instância "${instance}" estado: ${state}${statusReason != null ? ` (statusReason: ${String(statusReason)})` : ""}`,
      );
    }

    return response.status(200).json({ ok: true });
  }
}

import type { MessageReceivedData } from "../interface/message-data-type.js";
import type { InboundChatMessage } from "./inbound-chat-message.js";

function splitJid(remoteJid: string): { local: string; suffix: string } | null {
  const idx = remoteJid.indexOf("@");
  if (idx <= 0 || idx === remoteJid.length - 1) {
    return null;
  }
  return {
    local: remoteJid.slice(0, idx),
    suffix: remoteJid.slice(idx),
  };
}

export function mapWebhookToInbound(body: MessageReceivedData): InboundChatMessage | null {
  const instance = typeof body.instance === "string" ? body.instance.trim() : "";
  if (!instance) {
    return null;
  }

  const remoteJid = body.data?.key?.remoteJid?.trim() ?? "";
  if (!remoteJid) {
    return null;
  }

  const parsed = splitJid(remoteJid);
  if (!parsed) {
    return null;
  }

  const isGroup = parsed.suffix === "@g.us";
  const isPrivateChat = parsed.suffix === "@s.whatsapp.net";

  const participantRaw = body.data?.key?.participant;
  const participantJid =
    typeof participantRaw === "string" && participantRaw.trim().length > 0
      ? participantRaw.trim()
      : null;

  const sessionKey = `${instance}:${remoteJid}${participantJid ? `:${participantJid}` : ""}`;

  const replyDestination = isGroup ? remoteJid : parsed.local;

  const inbound: InboundChatMessage = {
    instance,
    remoteJid,
    participantJid,
    fromMe: body.data?.key?.fromMe ?? false,
    isGroup,
    isPrivateChat,
    text: body.data?.message?.conversation,
    pushName: typeof body.data?.pushName === "string" ? body.data.pushName : "",
    replyDestination,
    sessionKey,
    raw: body,
  };

  return inbound;
}

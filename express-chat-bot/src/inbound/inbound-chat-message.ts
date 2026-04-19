import type { MessageReceivedData } from "../interface/message-data-type.js";

export interface InboundChatMessage {
  instance: string;
  remoteJid: string;
  participantJid: string | null;
  fromMe: boolean;
  isGroup: boolean;
  isPrivateChat: boolean;
  text: string | undefined;
  pushName: string;
  /** Evolution `number` field: dígitos em chat privado; JID do grupo em `@g.us`. */
  replyDestination: string;
  /** Chave estável para sessão/memória futura. */
  sessionKey: string;
  raw: MessageReceivedData;
}

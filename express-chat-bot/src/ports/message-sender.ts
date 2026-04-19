export interface MessageSender {
  sendText(params: { instance: string; to: string; text: string }): Promise<void>;
}

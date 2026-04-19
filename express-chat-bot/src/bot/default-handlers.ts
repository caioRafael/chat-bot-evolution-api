import type { BotHandler } from "./bot-dispatcher.js";
import { homeQuestionHandler } from "./handlers/home-question-handler.js";
import { oiFromMeHandler } from "./handlers/oi-from-me-handler.js";

export function createDefaultBotHandlers(): BotHandler[] {
  return [homeQuestionHandler, oiFromMeHandler];
}

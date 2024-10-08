import { load } from "@std/dotenv";
import { expect } from "@std/expect";
import { Bot } from "../src/Bot.ts";

await load({ export: true });
const bot = new Bot(Deno.env.get("TOKEN") ?? "");

Deno.test("getMe", async () => {
  const response = await bot.getMe();
  expect(response.is_bot).toBeTruthy();
});

import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  GPT_KEY: str({ devDefault: testOnly("GPT_KEY") }),
  SCANDINAVIAN_BOT_TOKEN: str({ devDefault: testOnly("SCANDINAVIAN_BOT_TOKEN") }),
  SCANDINAVIAN_BOT_ID: str({ devDefault: testOnly("SCANDINAVIAN_BOT_ID") }),
});

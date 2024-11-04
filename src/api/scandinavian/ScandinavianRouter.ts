import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import {env} from "@/common/utils/envConfig";

export const scandinavianRegistry = new OpenAPIRegistry();
export const scandinavianRouter: Router = express.Router();

import OpenAI from "openai";
import sendMessage from "@/api/scandinavian/sendTg";
import randomStoreTheme from "@/api/scandinavian/randomStoreTheme";
import garrildStory from "@/api/scandinavian/garrildStory";
import generatePhoto from "@/api/scandinavian/generatePhoto";
import fradisStory from "@/api/scandinavian/fradisStory";

const openai = new OpenAI({ apiKey: env.GPT_KEY });

export type Character = "fradis" | "garrild";

scandinavianRegistry.registerPath({
  method: "get",
  path: "/scandinavian",
  tags: ["Scandinavian"],
  responses: createApiResponse(z.null(), "Success"),
});

const list: Character[] = ["fradis", "garrild"];
const randomCharacter = ():Character => list[Math.floor(Math.random() * list.length)];

const characters = {
  fradis: fradisStory,
  garrild: garrildStory,
}

scandinavianRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const theme = randomStoreTheme();
    const isPhoto = Math.random() > 0.3;

    const mainCharacter = randomCharacter();
    const story = await characters[mainCharacter](theme, isPhoto);

    if (!story) {
      throw new Error("Failed to generate story");
    }

    const image = isPhoto ? await generatePhoto(story, mainCharacter) : null;

    const tgResponse = await sendMessage(story, image);

    const serviceResponse = ServiceResponse.success("Scandinavian Service", {
      tgResponse,
      story,
      theme,
      isPhoto,
      image,
      mainCharacter
    });
    return handleServiceResponse(serviceResponse, res);
  } catch (error) {
    const serviceResponse = ServiceResponse.failure("Scandinavian Service", error.message);
    return handleServiceResponse(serviceResponse, res);
  }
});

scandinavianRouter.get("/health", async (_req: Request, res: Response) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "Create a realistic image of Garrid, the eternal messenger of Odin. He stands on the shore of the sea, with majestic fjords in the background. Garrid's appearance reflects his wise and mysterious nature; he has long, flowing hair and a beard, adorned with ancient runes inked on his skin. His attire is reminiscent of ancient Norse clothing, blending seamlessly with the natural surroundings. The sky is slightly overcast, creating a mystical ambiance. The ocean waves gently lap at his feet, and his expression is thoughtful, as if he is contemplating the mysteries of the world. This scene captures the essence of his character as a wise sage who travels between worlds, ready to share his knowledge with those who seek it.",
    n: 1,
    size: "1024x1024",
  });

  const serviceResponse = ServiceResponse.success("Scandinavian Service", response.data[0].url);
  return handleServiceResponse(serviceResponse, res);
});

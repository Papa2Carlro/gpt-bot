import OpenAI from "openai";
import {env} from "@/common/utils/envConfig";
const openai = new OpenAI({ apiKey: env.GPT_KEY });

const prompt = `Biography: Garrid is the eternal messenger of Odin, a sage who wanders the world, carrying the knowledge and wisdom of the gods. He possesses a powerful force of knowledge gained through millennia of observation and is the guardian of ancient sagas.
Story: `

const generatePhoto = async (story: string) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt + story,
    n: 1,
    size: "1024x1024",
  });

  return response.data[0].url;
}

export default generatePhoto;

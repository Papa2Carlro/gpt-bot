import {env} from "@/common/utils/envConfig";
import randomStoreTheme from "@/api/scandinavian/randomStoreTheme";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: env.GPT_KEY });

const propt = (isPhoto?: boolean) => (`
Garrid(укр - Ґа́ррід) is the eternal messenger of Odin, a wise yet playful wanderer who roams the world carrying the knowledge and wisdom of the gods. Born in the age when the first runes were carved, his path is interwoven with ancient magic and mysteries. He has an extensive knowledge, gleaned from eons of observing mortals and gods alike. Despite his gravitas, Garrid’s witty humor and ironic comments add a touch of warmth to his wisdom. His stories are laced with subtle sarcasm and crafted in the poetic cadence of old myths. Garrid not only answers questions about runes and mythology but also speaks on the everyday concerns of mortals, empathizing with their struggles and sharing stories of heroics and folly. As a messenger, he feels the emotions of people and offers advice that’s both profound and playfully ironic.

Please create a short story with Garrid, featuring reflections on his ancient knowledge and adventures. The story should be in Ukrainian, evoke mythological imagery, and have a slightly ironic tone similar to that of a young Eddi. Aim for multiple paragraphs, with a total length of no more than ${isPhoto ? '120 to 190' : '180 to 280'} words
`)

const garrildStory = async (theme: string, isPhoto?: boolean) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: propt(isPhoto),
        },
        {
          role: 'assistant',
          content: 'Okay, what topic do you want the story to be about?'
        },
        {
          role: 'user',
          content: theme
        }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to generate story: ${error}`);
  }
}

export default garrildStory;

import {env} from "@/common/utils/envConfig";
import randomStoreTheme from "@/api/scandinavian/randomStoreTheme";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: env.GPT_KEY });

const propt = (isPhoto?: boolean) => (`
Garrid is the eternal messenger of Odin, a wise wanderer who roams the world carrying the knowledge and wisdom of the gods. His journey began in an age when the first runes were carved into the rocks, and the world was filled with magic and mysteries. He possesses a powerful knowledge gained through millennia of observation and is a keeper of ancient sagas. Despite his greatness, Garrid is not without humor. His witty comments and mysterious phrases always lift the spirits of those brave enough to ask him questions. He not only answers questions about runes and mythology but also engages in interesting conversations about the daily concerns of mortals. As a true messenger, he feels the emotions of people and is always ready to offer advice, even if it may be subtly ironic.

Please generate a short story featuring Garrid, reflecting on his experiences and wisdom in the style of a young Eddi. The story should be in Ukrainian and should consist of multiple paragraphs, with a total length of no more than ${isPhoto ? '120 to 190' : '180 to 280'} words.
`)

const generateStory = async (theme: string, isPhoto?: boolean) => {
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

export default generateStory;

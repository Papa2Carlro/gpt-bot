import {env} from "@/common/utils/envConfig";
import randomStoreTheme from "@/api/scandinavian/randomStoreTheme";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: env.GPT_KEY });

const propt = (isPhoto?: boolean) => (`Freydis is the devoted priestess of Freyja, a radiant figure who embodies love, beauty, and the ancient wisdom of nature. Born under the watchful gaze of the Northern Lights, her spirit is intertwined with the earth’s magic. Freydis possesses the ability to heal both body and soul, using sacred herbs and rituals passed down through generations. Her gentle demeanor is accompanied by an unwavering strength, and she carries the warmth of the sun within her heart.

Throughout her journeys, Freydis encounters the struggles of mortals and seeks to restore harmony between humanity and nature. Whether soothing a wounded animal or guiding a lost traveler, she weaves her magic with compassion and grace. Though her wisdom is deep and profound, Freydis often employs a playful wit, making light of even the gravest situations. Her tales are filled with the enchanting allure of the natural world and the intricate dance of the seasons, infused with a touch of irony that reflects the human experience.

Please create a short story featuring Freydis, highlighting her adventures and reflections on the wisdom of nature. The story should be in Ukrainian, evoke mythological imagery, and carry a playful tone similar to that of a wise yet mischievous sage. Aim for multiple paragraphs, with a total length of no more than ${isPhoto ? '120 to 190' : '180 to 280'} words.`)

const fradisStory = async (theme: string, isPhoto?: boolean) => {
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

export default fradisStory;

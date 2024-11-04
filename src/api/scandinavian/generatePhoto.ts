import OpenAI from "openai";
import {env} from "@/common/utils/envConfig";
import {Character} from "@/api/scandinavian/ScandinavianRouter";
const openai = new OpenAI({ apiKey: env.GPT_KEY });

const garrild = `Garrid is the eternal messenger of Odin, a sage who wanders the world, carrying knowledge and wisdom. He possesses a powerful force of knowledge gained through millennia of observation and is the guardian of ancient sagas. The style is highly detailed, realistic, but with elements of graphic design. The graphics should be realistic with a natural color palette in cool blue and sulfurous tones. There should be no text on the image.`
const fradis = `
Freydis is depicted as a captivating figure embodying the essence of nature and magic. She has long, flowing hair the color of sunlit wheat, interwoven with delicate wildflowers and green vines, symbolizing her deep connection to the earth. Her eyes are a striking shade of emerald green, radiating warmth and wisdom. Freydis wears a flowing dress made from soft, natural fabrics in earthy tones, adorned with intricate patterns inspired by ancient runes and the flora of her homeland.

Her presence is enhanced by a gentle glow, as if she carries the light of the sun within her, and she often has a serene smile that reflects her compassionate spirit. Around her, there are subtle hints of magic: small, shimmering orbs of light float in the air, and the background features a lush forest filled with ancient trees and vibrant flowers. The color palette is natural and harmonious, with cool blues and warm earth tones, reflecting the balance of nature. The style is highly detailed and realistic, with graphic design elements that enhance her enchanting presence.
`

const characters = {
  garrild,
  fradis
}

const prompt = (character: Character) => ` ${characters[character]}
Story: `

const generatePhoto = async (story: string, character: Character) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt(character) + story,
    n: 1,
    size: "1024x1024",
  });

  return response.data[0].url;
}

export default generatePhoto;

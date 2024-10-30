import axios from "axios";
import {env} from "@/common/utils/envConfig";

const sendMessage = async (message:string, photoUrl?:string | null) => {
  const urlApi = `https://api.telegram.org/bot${env.SCANDINAVIAN_BOT_TOKEN}/${photoUrl ? 'sendPhoto' : 'sendMessage'}`;

  try {
    if (photoUrl) {
      await axios.post(urlApi, {
        chat_id: env.SCANDINAVIAN_BOT_ID,
        photo: photoUrl,
        caption: message,
      });
    } else {
      await axios.post(urlApi, {
        chat_id: env.SCANDINAVIAN_BOT_ID,
        text: message,
      });
    }

    return {message: 'Message sent successfully'};
  } catch (error) {
    return {message: 'Error sending message:', error}
  }
};

export default sendMessage;

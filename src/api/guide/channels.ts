import { parse } from "node-html-parser";
import { Channel } from "../../domain/channel";
import { Program } from "../../domain/schedule";
import { channelScraper } from "../../scrapper/channelScraper";
import { channelScheduleScraper } from "../../scrapper/channelScheduleScraper";

const BASE_URL = "https://www.movistarplus.es/programacion-tv";

export const GET = async () => {
  const channels = await fetchChannels();
  const result = await Promise.all(
    channels.map(async (channel) => ({ ...channel, schedule: await fetchChannelSchedule(channel)}))
  );

  return new Response(
    JSON.stringify(result), 
    {
      status: 200, 
      headers: { "content-type": "application/json", 'Cache-Control': 's-maxage=3600' } 
    }
  );
};

const fetchChannels = async () => {
  return fetch(BASE_URL)
    .then((response) => response.text())
    .then((html: string) => parse(html))
    .then(channelScraper.toChannels)
};

const fetchChannelSchedule = async (channel: { url: Channel["url"] | undefined }): Promise<Array<Program>> => {
  if (channel.url) {
    return fetch(channel.url)
    .then((response) => response.text())
    .then((html: string) => parse(html))
    .then(channelScheduleScraper.toChannelSchedule);
  }
  
  console.error("Invalid channel");
  console.error(channel);

  return [];
};
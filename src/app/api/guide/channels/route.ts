import { NextResponse } from "next/server";
import { parse } from "node-html-parser";
import { Channel } from "@/modules/domain/channel";
import { Program } from "@/modules/domain/schedule";
import { channelScraper } from "@/modules/scrapper/channelScraper";
import { channelScheduleScraper } from "@/modules/scrapper/channelScheduleScraper";

const BASE_URL = "https://www.movistarplus.es/programacion-tv";

export const revalidate = 3600;

export const GET = async () => {
  const channels = await fetchChannels();
  const result = await Promise.all(
    channels.map(async (channel) => ({ ...channel, schedule: await fetchChannelSchedule(channel)}))
  );

  return NextResponse.json(result, { headers: { "Cache-Control": "s-maxage=3600" }});
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
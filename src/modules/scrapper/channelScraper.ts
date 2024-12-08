import { HTMLElement } from "node-html-parser";

import { last } from "../utils/collectionUtils";

const CHANNEL_ICON_BASE_URL = "https://www.movistarplus.es/recorte/m-NEO/canal"

const CHANNELS_SELECTOR = "#lista_canales > li";
const CHANNEL_LINK_SELECTOR = "a";
const CHANNEL_METADATA_SELECTOR = "div > img";

const CHANNEL_URL_ATTRIBUTE = "href"
const CHANNEL_ICON_ATTRIBUTE = "src"
const CHANNEL_NAME_ATTRIBUTE = "title";

const toChannels = (html: HTMLElement) => {
  const channelElements = html.querySelectorAll(CHANNELS_SELECTOR);
  return channelElements.map(toChannel);
};

const toChannel = (channelElement: HTMLElement) => {
  const channelLinkItem = channelElement.querySelector(CHANNEL_LINK_SELECTOR);
  const channelLinkMetadataItem = channelElement.querySelector(CHANNEL_METADATA_SELECTOR);

  const channelUrl = channelLinkItem?.getAttribute(CHANNEL_URL_ATTRIBUTE);
  const channelIcon = channelLinkMetadataItem?.getAttribute(CHANNEL_ICON_ATTRIBUTE);
  const channelName = channelLinkMetadataItem?.getAttribute(CHANNEL_NAME_ATTRIBUTE);
  const icon = `${CHANNEL_ICON_BASE_URL}/${last(channelIcon?.split("/"))}`

  return { url: channelUrl, icon, name: channelName };
};

export const channelScraper = { toChannels };
import { HTMLElement } from "node-html-parser";

import { toString } from "@/modules/utils/stringUtils";
import { last } from "@/modules/utils/collectionUtils";

const PROGRAM_IMAGE_SELECTOR = "source";
const PROGRAM_HEADLINE_SELECTOR = "h2";
const PROGRAM_DESCRIPTION_SELECTOR = ".show-content > div.text";

const PROGRAM_IMAGE_ATTRIBUTE = "srcset";

const toProgramDetails = (html: HTMLElement) => {
    const imageUrl = last(html.querySelectorAll(PROGRAM_IMAGE_SELECTOR))?.getAttribute(PROGRAM_IMAGE_ATTRIBUTE);
    const headline = last(html.querySelectorAll(PROGRAM_HEADLINE_SELECTOR))?.innerText;
    const description = toString(html.querySelector(PROGRAM_DESCRIPTION_SELECTOR)?.innerText);

    return { imageUrl, headline, description };
};

export const programDetailsScraper = { toProgramDetails };
import { NextResponse } from "next/server";
import parse from "node-html-parser";
import { toString } from "../../../../modules/utils/stringUtils";
import { programDetailsScraper } from "../../../../modules/scrapper/programDetailsScraper";

export const revalidate = 3600;

export const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams;

    const programUrl = decodeURI(toString(searchParams.get("url")));
    const result = await fetchProgram(programUrl);
    
    return NextResponse.json(result);
};

const fetchProgram = (url: string) => {
    return fetch(url)
        .then((response) => response.text())
        .then((html: string) => parse(html))
        .then(programDetailsScraper.toProgramDetails)
};

import parse from "node-html-parser";
import { toString } from "../../utils/stringUtils";
import { programDetailsScraper } from "../../scrapper/programDetailsScraper";

export const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams;
    const programUrl = decodeURI(toString(searchParams.get("url")));
    const result = await fetchProgram(programUrl);
    
    return new Response(
        JSON.stringify(result), 
        {
          status: 200, 
          headers: { "content-type": "application/json", 'Cache-Control': 's-maxage=3600' } 
        }
      );
};

const fetchProgram = (url: string) => {
    return fetch(url)
        .then((response) => response.text())
        .then((html: string) => parse(html))
        .then(programDetailsScraper.toProgramDetails)
};

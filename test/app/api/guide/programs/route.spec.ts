import { describe, expect, it } from "vitest";

describe("spanish tv guide api", () => {
    const BASE_URL = "http://localhost:3000";

    it("returns a json response containing the program details", async () => {
        const channelsResponse = await fetch(`${BASE_URL}/api/guide/channels`).then(response => response.json());
        const programUrl = channelsResponse[0].schedule[0].url;

        const url = buildGetProgramDetailsUrl(BASE_URL, programUrl);
        const programResponse = await fetch(url).then(response => response.json());

        expect(programResponse).toEqual({
            imageUrl: expect.stringContaining("https://www.movistarplus.es"),
            headline: expect.any(String),
            description: expect.any(String)
        });
    });
}, 30000);

const buildGetProgramDetailsUrl = (baseUrl: string, url: string) => {
    const encodedProgramUrl = encodeURI(url);

    return `${baseUrl}/api/guide/program?${toQueryString("url", encodedProgramUrl)}`
};

const toQueryString = (key: string, value: string) => {
    const params = new URLSearchParams();
    params.append(key, value);
    
    return params.toString();
};
import { describe, expect, it } from "vitest";

import { Channel } from "@/modules/domain/channel";

const DATE_PATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;

describe("spanish tv guide api", () => {
    const BASE_URL = "http://localhost:3000";

    it("returns a json response containing the list of channels", async () => {
        const response = await fetch(`${BASE_URL}/api/guide/channels`).then(response => response.json()) as Channel[];

        expect(response).toContainEqual({
            url: "https://www.movistarplus.es/programacion-tv/TVE",
            icon: "https://www.movistarplus.es/recorte/m-NEO/canal/TVE.png",
            name: "LA 1",
            schedule: expect.any(Array)
        });

        expect(response[0].schedule[0]).toEqual({
            url: expect.stringContaining("https://www.movistarplus.es"),
            name: expect.any(String),
            startTime: expect.stringMatching(DATE_PATTERN)
        });
    });
}, 30000);
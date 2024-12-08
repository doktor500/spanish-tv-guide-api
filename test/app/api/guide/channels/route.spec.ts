import { describe, expect, it } from "vitest";

import { DATE_PATTERN } from "../../../../../src/modules/utils/dateTimeUtils";

describe("spanish tv guide api", () => {
    const BASE_URL = "http://localhost:3000";

    it("returns a json response containing the list of channels", async () => {
        const response = await fetch(`${BASE_URL}/api/guide/channels`).then(response => response.json());

        expect(response).toContainEqual({
            url: "https://www.movistarplus.es/programacion-tv/TVE",
            icon: "https://www.movistarplus.es/recorte/m-NEO/canal/TVE.png",
            name: "LA 1",
            schedule: expect.any(Array)
        });

        expect(response[0].schedule[0]).toEqual({
            url: expect.stringContaining("https://www.movistarplus.es"),
            name: expect.any(String),
            startTime: expect.stringMatching(DATE_PATTERN),
            isCurrentlyLive: expect.any(Boolean)
        });
    });
}, 30000);
import Url from "../models/url.js";
import generateShortId from "../utils/generateShortId.js";

export async function createShortUrl(originalUrl, discordId) {

    const shortId = generateShortId();

    const url = await Url.create({
        originalUrl: originalUrl,
        shortId: shortId,
        discordId: discordId
    });

    return url;
}
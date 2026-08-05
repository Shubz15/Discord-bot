import Url from "../models/Url.js";

export const redirectUrl = async (req, res) => {

    try {

        const { shortId } = req.params;

        const url = await Url.findOne({ shortId });

        if (!url) {
            return res.status(404).send("Short URL not found.");
        }

        url.clicks += 1;

        await url.save();

        return res.redirect(url.originalUrl);

    } catch (error) {

        console.log(error);

        return res.status(500).send("Internal Server Error");

    }

};
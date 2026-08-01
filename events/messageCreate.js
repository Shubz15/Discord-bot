import { Events } from "discord.js";
import User from "../models/User.js";

export default (client) => {

    client.on(Events.MessageCreate, async (message) => {

        if (message.author.bot) return;
        if (!message.guild) return;

        try {

            let user = await User.findOne({
                discordId: message.author.id,
            });

            if (!user) {

                user = await User.create({
                    discordId: message.author.id,
                    username: message.author.username,
                    avatar: message.author.displayAvatarURL(),
                });

                console.log(`✅ New user created: ${user.username}`);

            }

            // Increase XP
            user.xp += 5;

            // Level Up
            if (user.xp >= user.level * 100) {
                user.level += 1;
                user.xp = 0;

                message.channel.send(
                    `🎉 Congratulations ${message.author}, you reached Level ${user.level}!`
                );
            }

            await user.save();

        } catch (err) {

            console.error(err);

        }

    });

};
import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    MessageFlags
} from 'discord.js';

import { getColor } from '../../config/bot.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('resetprefixes')
        .setDescription('Reset all bot prefixes')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),

    async execute(interaction, client) {
        try {
            const deferSuccess =
                await InteractionHelper.safeDefer(interaction);

            if (!deferSuccess) return;

            const defaultPrefix = '!';

            for (const [guildId] of client.guilds.cache) {
                try {
                    if (client.db?.set) {
                        await client.db.set(
                            `prefix_${guildId}`,
                            defaultPrefix
                        );
                    }
                } catch (err) {
                    logger.error(
                        `Failed resetting prefix for ${guildId}`,
                        err
                    );
                }
            }

            const embed = new EmbedBuilder()
                .setColor(getColor('success'))
                .setTitle('✅ Prefixes Reset')
                .setDescription(
                    `All server prefixes have been reset to \`${defaultPrefix}\``
                );

            await InteractionHelper.safeEditReply(
                interaction,
                {
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                }
            );

        } catch (error) {
            logger.error(
                'Reset Prefix Command Error:',
                error
            );

            await InteractionHelper.safeEditReply(
                interaction,
                {
                    content:
                        '❌ Failed to reset prefixes.',
                    flags: MessageFlags.Ephemeral
                }
            );
        }
    },
};

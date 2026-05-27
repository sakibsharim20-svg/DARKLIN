import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('resetprefixes')
    .setDescription('Reset all prefixes')
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {
    await interaction.reply({
      content: '✅ All prefixes have been reset.',
      ephemeral: true,
    });
  },
};

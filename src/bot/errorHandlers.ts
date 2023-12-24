import { CommandInteraction } from 'discord.js';

export async function handleInteractionError(interaction: CommandInteraction, error: Error) {
  console.error(error);
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
  } else {
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}
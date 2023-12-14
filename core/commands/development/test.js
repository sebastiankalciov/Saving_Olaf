const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Command used for testing!'),
		
	async execute(interaction) {
		const emote = interaction.client.emojis.cache.get("1184979307437772902")
		const message = await interaction.reply(`${emote} Hellooo, I am Olaf and I like warm hugs`);
		
	},
};
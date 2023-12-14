const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Command used for testing!'),
		
	async execute(interaction) {
		await interaction.reply('Hellooo, I am Olaf and I like warm hugs');
	},
};
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Command used for testing!'),
		
	async execute(interaction) {
		
		await interaction.reply("ce faaa ma")


	},
};
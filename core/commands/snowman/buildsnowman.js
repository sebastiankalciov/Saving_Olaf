const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('buildsnowman')
		.setDescription('Build a snoooooowmaaan!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Put the name of the snowman')
                .setRequired(true)
            )
        ,
		
	async execute(interaction) {

		async function buildSnowman(id) {
			const userProfile = client.profiles.get(id);
            
			if (!userProfile) return null;
            const userSnowman = client.snowmans.get(id);
            if (userSnowman) return true;

            const { Snowmans } = require('../../database/objects.js');
            const snowmanName = interaction.options.get('name').value;

			const newUserSnowman = await Snowmans.create({ user_id: id, name: snowmanName});

			client.snowmans.set(id, newUserSnowman);
		
			return newUserSnowman;
		}

		const user = interaction.options.getUser('user') ?? interaction.user;

        const emotes = require('../../../source/config/emotes.json')
		const emote = interaction.client.emojis.cache.get(emotes.olaf_talking);

		try {

			buildSnowman(user.id).then(async hasSnowman => {
                
				if (hasSnowman === true) {

                    await interaction.reply({
						content: `${emote} Hellooo, you already built a snowman!`,
						ephemeral: true
					});

                } else if (hasSnowman === null) {
                    
                    await interaction.reply({
						content: `${emote} Hellooo, you do not have a profile! Please create one in order to build a snowman`,
						ephemeral: true
					});

                } else {

                    await interaction.reply({
						content: `${emote} Thaank you for helping me!`,
						ephemeral: false
					});
				}
			})

		} catch (error) {

			await interaction.reply ({
				content: `${emote} There was an issue creating your profile! Please send a message to the developers followed by this error: ${error}`,
				ephemeral: true
			})
		}
	},
};
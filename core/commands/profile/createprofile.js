const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('createprofile')
		.setDescription('Create a profile to help Olaf with the evil snow mans!'),
		
	async execute(interaction) {

		async function createProfile(id) {
			const user = client.profiles.get(id);
            
			if (user) return true;

            const { Profiles } = require('../../database/objects.js');
			const newUser = await Profiles.create({ user_id: id});

			client.profiles.set(id, newUser);
		
			return newUser;
		}

		const user = interaction.options.getUser('user') ?? interaction.user;

        const emotes = require('../../../source/config/emotes.json')
		const emote = interaction.client.emojis.cache.get(emotes.olaf_talking);

		try {

			createProfile(user.id).then(async hasProfile => {
                
				if (hasProfile === true) {

                    await interaction.reply({
						content: `${emote} Hellooo, you already have a profile!`,
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
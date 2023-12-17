const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()

        // Define slash command "view" with 2 subcommands: profile, snowman
        .setName('view')
        .setDescription('Display either your profile or your snowman')
        .addSubcommand(option =>
            option
            .setName('profile')
            .setDescription('Display your profile and see where you need to get better in order to save Arendelle')
        )
        .addSubcommand(option =>
            option
            .setName('snowman')
            .setDescription('See how your snowman looks like. Is he ready for battle or not?')
        ),

    async execute(interaction) {

        async function getProfile(id) {
            
            const profile = client.profiles.get(id);
            return profile ? profile : null
        }

        const emotes = require('../../../source/config/emotes.json')
        const emote = interaction.client.emojis.cache.get(emotes.olaf_talking);

        try {

            const user = interaction.options.getUser('user') ?? interaction.user;

            const optionProfile = interaction.options.getSubcommand() === "profile";
            if (optionProfile) {
                
                getProfile(user.id).then(async userProfile => {

                    if (userProfile === null) {

                        await interaction.reply({
                            content: `${emote} Hellooo, you do not have a profile! Please create one in order to join the epic fight between Arendelle and evil snowmans ;)`,
                            ephemeral: true
                        });

                    } else {

                        const { Snowmans } = require('../../database/objects.js');
                        const snowman = await Snowmans.findOne({
                            where: {
                                user_id: user.id
                            }
                        });

                        const snowmanName = snowman ? snowman.name : "You do not have a snowman ;(";
                        const fightsWon = userProfile.fights_won;

                        const { EmbedBuilder } = require('discord.js');
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: user.username,
                                iconURL: user.avatarURL()
                            })
                            .setColor("#1abc8e")
                            .addFields({
                                name: "Snowman",
                                value: `${snowmanName}`
                            }, {
                                name: "Fights won",
                                value: `${fightsWon}`
                            })

                        await interaction.reply({
                            embeds: [embed]
                        });

                    }
                })
            } else {
                const { Snowmans, Equipment} = require('../../database/objects.js');
                const snowman = await Snowmans.findOne({
                    where: {
                        user_id: user.id
                    }
                });

                if (snowman) {

                    const broom = await Equipment.findOne({
                        where: {
                            id: snowman.broom_id
                        }
                    })
                    // Database related issue, to be fixed later
                    
                    // const pot = await Equipment.findOne({
                    //     where: {
                    //         id: snowman.pot_id
                    //     }
                    // })

                    // const scarf = await Equipment.findOne({
                    //     where: {
                    //         id: snowman.scarf_id
                    //     }
                    // })
                    const { EmbedBuilder } = require('discord.js');
                    const broomEmote = interaction.client.emojis.cache.get(emotes.broom);
                    const snowmanEmote = interaction.client.emojis.cache.get(emotes.snowman);
                    const snowballEmote = interaction.client.emojis.cache.get(emotes.snowball);
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: user.username,
                            iconURL: user.avatarURL()
                        })
                        .setColor("#1abc8e")
                        .addFields({
                            name: `${snowmanEmote} Snowman's name`,
                            value: `${snowman.name}`
                        }, {
                            name: `${broomEmote} Broom name`,
                            value: `${broom.name}`,
                            inline: true
                        }, {
                            name: `${broomEmote} Broom description`,
                            value: `${broom.description}`,
                            inline: true
                        }, {
                            name: `${snowballEmote} Snowballs`,
                            value: `${snowman.snowballs}`,
                        })
    
                    await interaction.reply({
                        embeds: [embed]
                    });
    
                } else {
                    await interaction.reply({
                        content: `${emote} You do not have a snowman ;( Bring one to life!!`,
                        ephemeral: true
                    })
                }

            }
        } catch (error) {

            await interaction.reply({
                content: `${emote} There was an issue displaying your profile! Please send a message to the developers followed by this error: ${error}`,
                ephemeral: true
            })
        }
    },
};
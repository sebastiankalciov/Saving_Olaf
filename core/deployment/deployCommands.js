const path = require('node:path');
const foldersPath = path.join(__dirname, '../commands');

const fs = require('node:fs');
const commandFolders = fs.readdirSync(foldersPath);

const commands = []

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Append a new command into the collection
        if ('data' in command && 'execute' in command) {
            
            commands.push(command.data.toJSON());

        } else {
            console.log(`[Warning]: Command at ${filePath} is missing a required "data" or "execute" property!`)
        }
    }
}

// Register slash commands
const credentials = require("../../source/config/credentials.json")

const {REST} = require('discord.js');
const rest = new REST().setToken(credentials.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const { Routes } = require('discord.js');
		const data = await rest.put(
			Routes.applicationCommands(credentials.client_id),
            // Routes.applicationGuildCommands(credentials.client_id, credentials.main_guild_id),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);

	} catch (error) {
		console.error(error);
	}
})();
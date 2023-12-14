const fs = require('node:fs');
const path = require('node:path');

const {
    REST,
    Routes,
} = require('discord.js');

const credentials = require("../../source/config/credentials.json");
const commands = [];


const foldersPath = path.join(__dirname, '../commands');
console.log(foldersPath)
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Append a new command into the collection
        if ('data' in command && 'execute' in command) {
            console.log(`command data: ${command.data.toJSON()}`)
            commands.push(command.data.toJSON());

        } else {
            console.log(`[Warning]: Command at ${filePath} is missing a required "data" or "execute" property!`)
        }
    }
}

// Deploy commands in development
const rest = new REST().setToken(credentials.token);

(async () => {
    try {

        console.log('Started refreshing application (/) commands.');

        const data = await rest.put(
            Routes.applicationGuildCommands(credentials.client_id, credentials.main_guild_id), {
                body: commands
            },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    } catch (error) {
        console.error(error);
    }
})();
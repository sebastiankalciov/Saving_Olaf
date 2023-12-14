const fs = require('node:fs');
const path = require('node:path');

const {
    REST,
    Routes,
    Client,
    Collection,
    Events,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const credentials = require("../../source/config/credentials.json")

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Append a new command into the collection
        if ('data' in command && 'execute' in command) {

            client.commands.set(command.data.name, command);

        } else {
            console.log(`[Warning]: Command at ${filePath} is missing a required "data" or "execute" property! [PROD]`)
        }
    }
}

// Deploy commands in production
const rest = new REST().setToken(credentials.token);

(async () => {
    try {

        console.log('Started refreshing application (/) commands. [PROD]');

        const data = await rest.put(
            Routes.applicationCommands(credentials.client_id), {
                body: commands
            },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands. [PROD]`);

    } catch (error) {
        console.error(error);
    }
})
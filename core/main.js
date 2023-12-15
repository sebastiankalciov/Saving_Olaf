const fs = require('node:fs');
const path = require('node:path');

const {
    REST,
    Routes,
    Client,
    Collection,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});
const credentials = require("../source/config/credentials.json")


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

            console.log(`[Warning]: Command at ${filePath} is missing a required "data" or "execute" property!`);

        }
    }
}


// Register slash commands

const rest = new REST().setToken(credentials.token);

(async () => {
    try {

        console.log('Started refreshing application (/) commands.');

        const data = await rest.put(
            Routes.applicationGuildCommands(credentials.client_id, credentials.guild_id), {
                body: commands
            },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    } catch (error) {
        console.error(error);
    }
})

// Register events

const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventsFiles) {

    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));

    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }

}

client.login(credentials.token);
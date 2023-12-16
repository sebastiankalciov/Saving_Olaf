const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const {Collection} = require('discord.js');
client.commands = new Collection();
client.profiles = new Collection();
client.snowmans = new Collection();

// Register commands

const path = require('node:path');
const foldersPath = path.join(__dirname, 'commands');

const fs = require('node:fs');
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

const credentials = require("../source/config/credentials.json")
client.login(credentials.token);
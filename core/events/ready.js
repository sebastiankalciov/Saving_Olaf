const { Events } = require('discord.js');

module.exports = {
    
    name: Events.ClientReady,
    once: true,
    async execute (client) {
        
        const { Profiles } = require('../database/objects');
        const storedData = await Profiles.findAll();
        
        storedData.forEach(profile => client.profiles.set(profile.user_id, profile))

        console.log(`Client ready! Logged in as ${client.user.tag}`)
    }
}
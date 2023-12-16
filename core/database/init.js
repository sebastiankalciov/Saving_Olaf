const Sequelize = require('sequelize');

const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

const Equipment = require('./models/Equipment.js')(database, Sequelize.DataTypes);
require('./models/Profiles.js')(database, Sequelize.DataTypes);
require('./models/Snowmans.js')(database, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('--f');

database.sync({force}).then(async () => {
    
    // Add default equipments to database
    const equipments = [
        Equipment.upsert({
            type: "Broom",
            name: "Magic Broom",
            description: "Magic Broom is a special tool used by ancient civilizations to get rid of angry snow mans."
        }),
        Equipment.upsert({
            type: "Pot",
            name: "Magic Pot",
            description: "The magic pot is a special pot bewitched to act like a shield against enemies."
        }),
        
        Equipment.upsert({
            type: "Scarf",
            name: "Magic Scarf",
            description: "The warm and stylish scarf is perfect for anxious moments when dealing with monsters."
        }),
    ]

    await Promise.all(equipments);
    console.log("Good news! Database is synced")

    database.close()

}).catch(console.error);
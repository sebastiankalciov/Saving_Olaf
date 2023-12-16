const Sequelize = require('sequelize');

const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

const Profiles = require('./models/Profiles.js')(database, Sequelize.DataTypes);
const Snowmans = require('./models/Snowmans.js')(database, Sequelize.DataTypes);
const Equipment = require('./models/Equipment.js')(database, Sequelize.DataTypes);

// Make relations between tables
Snowmans.belongsTo(Profiles, { foreignKey: 'user_id', as: 'user' });


// Add custom property, createSnowman

Reflect.defineProperty(Profiles.prototype, 'createSnowman', {
    value: async snowman => {
        const userSnowman = await Snowmans.findOne ({
            where: {user_id: this.user_id, snowman_id: snowman.snowman_id}
        });
        
        if (userSnowman) return;

        return Snowmans.create({user_id: this.user_id, snowman_id: snowman.snowman_id});
    },
})

// Add custom property, getSnowman

Reflect.defineProperty(Profiles.prototype, 'getSnowman', {

    value: () => {
        return Profiles.findAll ({
            where: {user_id: this.user_id},
            include: ['snowman']
        });
    },
});


module.exports = {Profiles, Snowmans, Equipment};
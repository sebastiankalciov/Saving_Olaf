module.exports = (database, DataTypes ) => {

    return database.define('profiles', {

        user_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },

        fights_won: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });
}
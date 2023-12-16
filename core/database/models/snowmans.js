module.exports = (database, DataTypes ) => {

    return database.define('snowmans', {
        
        user_id: DataTypes.STRING,
        snowman_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        broom_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        pot_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        scarf_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        snowballs: {
            type: DataTypes.INTEGER,
            defaultValue: 10,
            allowNull: false
        }
    });
}
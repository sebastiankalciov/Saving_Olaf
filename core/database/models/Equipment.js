module.exports = (database, DataTypes ) => {

    return database.define('equipment', {
        
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "Special armor to defeat evil snow mans.",
            allowNull: false
        }
    }, {
        timestamps: false
    });
}
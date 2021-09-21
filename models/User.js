const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    //uses bcrypt to verify password
    checkPassword(pw) {
        return bcrypt.compareSync(pw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            //setup hooks so hashes are stored instead of plaintext
            async beforeCreate(user) {
                user.password = await bcrypt.hash(user.password, 10);
                return user;
            },
            async beforeUpdate(user) {
                user.password = await bcrypt.hash(user.password, 10);
                return user;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'
    }    
);

module.exports = User;
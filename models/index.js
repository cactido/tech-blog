//include all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
//database associations
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, { foreignKey: 'post_id' });

module.exports = { User, Post, Comment };
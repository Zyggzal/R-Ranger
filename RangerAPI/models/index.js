const User = require('./User');
const Group = require('./Group');
const Event = require('./Event');
const Invite = require('./Invite');
const Review = require('./Review');
const UsersGroups = require('./UsersGroups');

Group.belongsToMany(User, { through: UsersGroups, as: 'members' });
User.belongsToMany(Group, { through: UsersGroups, as: 'memberOf' });

User.hasMany(Group, { foreignKey: 'createdBy', as: 'creatorOfGroups' });
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Event, { foreignKey: 'createdBy', as: 'creatorOfEvents'});
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Event.belongsToMany(User, { through: Invite, as: 'participants' });
User.belongsToMany(Event, { through: Invite, as: 'participatesIn' });

Event.belongsTo(Group, { foreignKey: 'createdByGroup', as: 'creatorGroup' });
Group.hasMany(Event, { foreignKey: 'createdByGroup', as: 'creatorOf' });

User.hasMany(Invite, { foreignKey: 'UserId', as: 'invites' });

Invite.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Invite.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
Invite.belongsTo(Event, { foreignKey: 'EventId', as: 'event' });

Event.hasMany(Review, { foreignKey: 'EventId', as: 'reviews' });
Review.belongsTo(Event, { foreignKey: 'EventId', as: 'event' });

User.hasMany(Review, { foreignKey: 'UserId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

// Event.belongsToMany(User, { through: Invite })
// Event.belongsToMany(User, { through: Review })
// User.hasOne(Event, { foreignKey: 'createdBy' })
// Event.belongsTo(User, { foreignKey: 'createdBy' })
// Group.hasOne(Event, { foreignKey: 'createdByGroup', allowNull: true })
// Event.belongsTo(Group, { foreignKey: 'createdByGroup', allowNull: true })

// Invite.belongsTo(User, { foreignKey: 'sender' }) 


module.exports = {
    User,
    Group,
    Event,
    Invite,
    Review,
    UsersGroups
}
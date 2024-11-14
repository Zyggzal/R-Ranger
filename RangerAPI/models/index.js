const User = require('./User');
const Group = require('./Group');
const Event = require('./Event');
const Invite = require('./Invite');
const Review = require('./Review');
const UsersGroups = require('./UsersGroups');
const EventParticipants = require('./EventParticipants');
const Friend = require('./Friend');

Group.belongsToMany(User, { through: UsersGroups, as: 'members' });
User.belongsToMany(Group, { through: UsersGroups, as: 'memberOf' });

User.hasMany(Group, { foreignKey: 'createdBy', as: 'creatorOfGroups' });
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Event, { foreignKey: 'createdBy', as: 'creatorOfEvents'});
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Event.belongsToMany(User, { through: EventParticipants, as: 'participants' });
User.belongsToMany(Event, { through: EventParticipants, as: 'participatesIn' });

Event.belongsTo(Group, { foreignKey: 'createdByGroup', as: 'creatorGroup' });
Group.hasMany(Event, { foreignKey: 'createdByGroup', as: 'creatorOf' });

User.hasMany(Invite, { foreignKey: { name: 'UserId', unique: 'invite_composite' }, as: 'invites' });
Event.hasMany(Invite, { foreignKey: { name: 'EventId', unique: 'invite_composite' }, as: 'invites' });
Group.hasMany(Invite, { foreignKey: { name: 'GroupId', unique: 'invite_composite' }, as: 'invites' });

Invite.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Invite.belongsTo(User, { foreignKey: { name: 'UserId', unique: 'invite_composite' }, as: 'user' });
Invite.belongsTo(Event, { foreignKey: { name: 'EventId', unique: 'invite_composite' }, as: 'event' });
Invite.belongsTo(Group, { foreignKey: { name: 'GroupId', unique: 'invite_composite' }, as: 'group' });

Event.hasMany(Review, { foreignKey: { name: 'EventId', unique: 'composite' }, as: 'reviews' });
Review.belongsTo(Event, { foreignKey: { name: 'EventId', unique: 'composite' }, as: 'event' });

User.hasMany(Review, { foreignKey: { name: 'UserId', unique: 'composite' }, as: 'reviews' });
Review.belongsTo(User, { foreignKey: { name: 'UserId', unique: 'composite' }, as: 'user' });

User.belongsToMany(User, { through: Friend, as: 'friends' })

module.exports = {
    User,
    Group,
    Event,
    Invite,
    Review,
    UsersGroups,
    EventParticipants,
    Friend
}
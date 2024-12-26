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

User.hasMany(Group, { foreignKey: 'createdBy', as: 'creatorOfGroups', onDelete: 'cascade' });
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Event, { foreignKey: 'createdBy', as: 'creatorOfEvents', onDelete: 'cascade' });
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Event.belongsToMany(User, { through: EventParticipants, as: 'participants' });
User.belongsToMany(Event, { through: EventParticipants, as: 'participatesIn' });

Event.belongsTo(Group, { foreignKey: 'createdByGroup', as: 'creatorGroup' });
Group.hasMany(Event, { foreignKey: 'createdByGroup', as: 'creatorOf', onDelete: 'cascade' });

User.hasMany(Invite, { foreignKey: { name: 'UserId', unique: 'invite_composite' }, as: 'invites', onDelete: 'cascade' });
Event.hasMany(Invite, { foreignKey: { name: 'EventId', unique: 'invite_composite' }, as: 'invites', onDelete: 'cascade' });
Group.hasMany(Invite, { foreignKey: { name: 'GroupId', unique: 'invite_composite' }, as: 'invites', onDelete: 'cascade' });

Invite.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Invite.belongsTo(User, { foreignKey: { name: 'UserId', unique: 'invite_composite' }, as: 'user' });
Invite.belongsTo(Event, { foreignKey: { name: 'EventId', unique: 'invite_composite' }, as: 'event' });
Invite.belongsTo(Group, { foreignKey: { name: 'GroupId', unique: 'invite_composite' }, as: 'group' });

Event.hasMany(Review, { foreignKey: { name: 'EventId', unique: 'composite' }, as: 'reviews', onDelete: 'cascade' });
Review.belongsTo(Event, { foreignKey: { name: 'EventId', unique: 'composite' }, as: 'event' });

User.hasMany(Review, { foreignKey: { name: 'UserId', unique: 'composite' }, as: 'reviews', onDelete: 'cascade' });
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
require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

/* BOT & INTENTS */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,        // guild structure, channels, roles
    GatewayIntentBits.GuildMembers,  // member join/leave events & role edits
  ],
});

/* CONSTANTS YOU MAY TWEAK */
const PLACEHOLDER_ROLE = 'Placeholder';   // role to give everyone on join
const WELCOME_CHANNEL  = 'welcome';       // channel where the bot will greet

/* READY EVENT */
client.once('ready', () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
});

/* MEMBER-JOIN EVENT */
client.on('guildMemberAdd', async (member) => {
  console.log(`👤 ${member.user.username} just joined ${member.guild.name}`);

  /* Give the placeholder role */
  const role = member.guild.roles.cache.find(r => r.name === PLACEHOLDER_ROLE);

  let roleAssigned = false;
  if (role) {
    try {
      await member.roles.add(role);
      roleAssigned = true;
      console.log(`➡️  Assigned role "${PLACEHOLDER_ROLE}" to ${member.user.username}`);
    } catch (err) {
      console.error('❌ Could not assign role:', err);
    }
  } else {
    console.log(`⚠️ Role "${PLACEHOLDER_ROLE}" does not exist in this server`);
  }

  /* Send the welcome message */
  const channel = member.guild.channels.cache.find(
    ch => ch.name === WELCOME_CHANNEL && ch.type === ChannelType.GuildText
  );

  if (channel) {
    channel.send(
      `🎉 Welcome <@${member.id}> to **${member.guild.name}**!\n` +
      (roleAssigned
        ? `You’ve been given the **${PLACEHOLDER_ROLE}** role.`
        : `An admin will assign your role shortly.`)
    );
  } else {
    console.log(`⚠️ Channel "${WELCOME_CHANNEL}" not found — no welcome message sent`);
  }
});

/* LOG IN */
client.login(process.env.DISCORD_TOKEN);

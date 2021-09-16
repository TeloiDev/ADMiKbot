const Guild = require(`../models/guild`);

module.exports = async (Discord, client, member) =>{

    const settings = await Guild.findOne({
        guildID: member.guild.id,
    });

    if (settings === null) return;


    if (settings.welcome.welcomeMessage === null) {
        settings.welcome.welcomeMessage = "Witaj {user} na serwerze {server}";
    }
    const channel = client.channels.cache.find(c => c.id === settings.welcome.welcomeChannel);

    channel.send(settings.welcome.welcomeMessage
        .replace(/{user}/g, member.tag)
        .replace(/{server}/g, member.guild.name)
        .replace(/{username}/g, member.username)
        .replace(/{membercount}/g, member.guild.memberCount)
    )
}
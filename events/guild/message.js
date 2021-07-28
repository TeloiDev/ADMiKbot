const Guild = require(`../../models/guild`);
const colors = require(`../../colors.json`);

module.exports = async (Discord, client, message) => {
    if (message.channel.type === `dm`) return;

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ];
    
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    
    try {
        if (message.channel.id === settings.memeChannel){
            if (message.attachments.size > 0){
                addReactions(vote);
            }

        } else if (message.channel.id === settings.linkChannel){
            if (message.content.includes(`https://`)){
                addReactions(vote);
            }
        }

        counting();

    } catch (e) {}

    
    let prefix;
    if (!settings) {
        prefix = `?`;
    } else {
        prefix = settings.prefix;
    }
    

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) return;
    if(command.permissions){
        let invalidPerms = []
        for(const perm of command.permissions){
          if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
        }
            if(!message.member.hasPermission(perm)){
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length){
            const embed = new Discord.MessageEmbed()
            .setColor(colors.incorrectUsage)
            .setTitle("Brakujące Uprawnienia!")
            .setDescription(`Brakuje ci uprawnień: \`${invalidPerms.join(`, `)}\` aby wykonać komendę \`${command.name}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);
        }
    }

    try {
        command.execute(message, args, Discord, client, prefix, colors, command);
    } catch (err) {
        message.channel.send(`???`);
        console.log(err);
        return;
    }

    /**
     * Funkcje
     * @returns
     */

    async function counting() {
        if (message.author.bot) return;
        let count = settings.counting.count;
        const countingChannel = settings.counting.countingChannel;

        if (message.channel.id === countingChannel) {
        

            if (Number(message.content) === count) {
                count++;
                await settings.updateOne({
                    counting: {
                        countingChannel: countingChannel,
                        count: count,
                    },
                });
                
            } else if (Number(message.content) != count) {
    
                if (message.author.id !== client.user.id) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(colors.incorrectUsage)
                    .setDescription(`${message.author} przerwał liczenie na \`${count - 1}\`\nZaczynamy od początku :')`)
                    .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    message.channel.send(embed);

                    client.channels.cache.find(c => c.id === countingChannel).setTopic(`Ostatnio doszliśmy do: \`${count - 1}\``);

                    await settings.updateOne({
                        counting: {
                            countingChannel: countingChannel,
                            count: 1,
                        },
                    });
                }
            }
        }
    }

    function addReactions(type) {
        switch (type){
            case vote:
                message.react(`847522526422499329`);
                message.react(`847522526246600734`);
            break;
        }
        
    }

}
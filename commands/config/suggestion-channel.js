const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'suggestion-channel',
    category: `config`,
    description: 'Ustaw kanał do sugestii na serwerze, bot doda reakcję do każdej wiadomości zawierającej załącznik',
    permissions: [`MANAGE_GUILD`, `ADMINISTRATOR`],
    usage: `<prefix> suggestion-channel <#kanał/null>`,
    aliases: [`suggestion-ch`, `kanał-sugestie`, `pomysły-kanał`, `suggestion-config`, `pomysł-config`],
    async execute(message, args, Discord, client, prefix, colors, command){
        const channel = message.mentions.channels.first();

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: `?`,
                    suggestionChannel: channel.id,
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        if (!channel || isNaN(channel)) {
            if (args[0] == `null`){
                await settings.updateOne({
                    suggestionChannel: null
                });
                const embed = new Discord.MessageEmbed()
                .setTitle(`Zresetowano ustawienia`)
                .setColor(colors.correctUsage)
                .setDescription(`Zresetowano ustawienia kanału do sugestii!`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);

            } else {

                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Nie podano kanału. Aktualnie kanałem do sugestii jest: <#${settings.suggestionChannel}>`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }
        };

        await settings.updateOne({
            suggestionChannel: channel.id
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Zapisano ustawienia`)
        .setColor(colors.correctUsage)
        .setDescription(`Ustawiono kanał ${channel} jako kanał do suggestii`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send(embed);
    }
}
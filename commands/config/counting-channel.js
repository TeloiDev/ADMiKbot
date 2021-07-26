const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'counting-channel',
    category: `config`,
    description: 'Ustaw kanał do liczenia na serwerze, świetna zabawa dla całej rodziny',
    permissions: [`MANAGE_GUILD`, `ADMINISTRATOR`],
    usage: `<prefix> counting-channel <#kanał/null>`,
    aliases: [`counting-ch`, `kanał-liczenie`, `liczenie-kanał`, `counting-config`, `liczenie-config`],
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
                    counting: {
                        countingChannel: channel.id,
                        count: 1,
                    },
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        if (!channel || isNaN(channel)) {
            if (args[0] == `null`){
                await settings.updateOne({
                    counting: {
                        countingChannel: null,
                        count: 1,
                    },
                });
                const embed = new Discord.MessageEmbed()
                .setTitle(`Zresetowano ustawienia`)
                .setColor(colors.correctUsage)
                .setDescription(`Zresetowano ustawienia kanału do liczenia!`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);

            } else {

                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Nie podano kanału. Aktualnie kanałem do liczenia jest: <#${settings.suggestionChannel}>`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }
        };

        await settings.updateOne({
            counting: {
                countingChannel: channel.id,
                count: 1,
            },
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Zapisano ustawienia`)
        .setColor(colors.correctUsage)
        .setDescription(`Ustawiono kanał ${channel} jako kanał do liczenia`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send(embed);
    }
}
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'welcome-channel',
    category: `config`,
    description: 'Ustaw kanał na którym bot będzie wysyłał wiadomość gdy ktoś dołączy na serwer',
    permissions: [`MANAGE_GUILD`, `ADMINISTRATOR`],
    usage: `<prefix> suggestion-channel <#kanał/null>`,
    aliases: [`welcome-ch`, `kanał-powitania`],
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
                    welcome: {
                        welcomeChannel: channel.id,
                        welcomeMessage: "Witaj {user} na serwerze {server}"
                    }
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
                .setDescription(`Zresetowano ustawienia kanału do powitań!`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);

            } else {

                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Nie podano kanału. Aktualnie kanałem do powitań jest: <#${settings.welcome.welcomeChannel}>`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }
        };

        await settings.updateOne({
            welcome: {
                welcomeChannel: channel.id,
                welcomeMessage: settings.welcomeMessage
            }
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Zapisano ustawienia`)
        .setColor(colors.correctUsage)
        .setDescription(`Ustawiono kanał ${channel} jako kanał do powitań`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send(embed);
    }
}
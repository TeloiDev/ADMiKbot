const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'meme-channel',
    category: `config`,
    description: 'Ustaw kanał do memów na serwerze, bot doda reakcję do każdej wiadomości zawierającej załącznik',
    permissions: [`MANAGE_GUILD`, `ADMINISTRATOR`],
    usage: `<prefix> meme-channel <#kanał/null>`,
    aliases: [`meme-ch`, `kanał-memy`, `memy-kanał`, `meme-config`, `memy-config`],
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
                    memeChannel: channel.id,
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        if (!channel || isNaN(channel)) {
            if (args[0] == `null`){
                await settings.updateOne({
                    linkChannel: null
                });
                const embed = new Discord.MessageEmbed()
                .setTitle(`Zresetowano ustawienia`)
                .setColor(colors.correctUsage)
                .setDescription(`Zresetowano ustawienia kanału do memów!`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send({embeds: [embed]});

            } else {

                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Nie podano kanału. Aktualnie kanałem do memów jest: <#${settings.memeChannel}>`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send({embeds: [embed]});
            }
        };

        await settings.updateOne({
            memeChannel: channel.id
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Zapisano ustawienia`)
        .setColor(colors.correctUsage)
        .setDescription(`Ustawiono kanał ${channel} jako kanał do memów`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send({embeds: [embed]});
    }
}
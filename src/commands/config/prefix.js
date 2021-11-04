const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'prefix',
    category: `config`,
    description: 'Ustaw prefix dla swojego servera',
    permissions: [`MANAGE_GUILD`, `ADMINISTRATOR`],
    usage: `<prefix> prefix <nowy_prefix>`,
    aliases: [`prefix-set`, `prefix-config`, `pref`, `pref-config`, `pref-set`],
    async execute(message, args, Discord, client, prefix, colors, command){
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: args[0]
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

            }
        });

        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Nie podano prefixu. Aktualny to: \`${settings.prefix}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        };

        await settings.updateOne({
            prefix: args[0]
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Zmieniono prefix!`)
        .setColor(colors.correctUsage)
        .setDescription(`Twój prefix został zmieniony na: \`${args[0]}\``)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send({embeds: [embed]});
    }
}
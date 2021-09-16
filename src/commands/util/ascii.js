const figlet = require(`figlet`);

module.exports = {
    name: `ascii`,
    description: `Generuje tekst zrobiony ze znaków specjalnych`,
    category: `util`,
    permissions: [],
    usage: `<prefix> ascii <text>`,
    aliases: [`asci`,],
    execute(message, args, Discord, colors, client, command, prefix){
        msg = args.join(" ");

        figlet.text(msg, {
        }, function(err, data) {
            if (err) {
                const embed = new Discord.MessageEmbed()
                .setTitle(`Error!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Coś poszło nie tak...`)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send({embeds: [embed]});

            } else {
                const embed = new Discord.MessageEmbed()
                .setTitle(`ASCII`)
                .setColor(colors.correctUsage)
                .setDescription('```' + data + '```')
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send({embeds: [embed]});
            }
        });
    }
}
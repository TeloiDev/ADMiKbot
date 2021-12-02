const { Font, Tools } = require("convstring");

module.exports = {
    name: `czcionka`,
    description: `Pozwala ci zmienić czcionkę tekstu!`,
    category: `util`,
    permissions: [],
    usage: `<prefix> czcionka [lista] || <czcionka> <tekst>`,
    aliases: [`font`, `unicode`],
    execute(message, args, Discord, client, prefix, colors, command){
        if (args[0] === "lista" || !args[0] || !args[1]) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Lista Dostępnych Czcionek")
            .setColor(colors.correctUsage)
            .setDescription(`\`${Tools.returnAllFonts().join(", ")}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        } else if (args[0] === Tools.returnAllFonts().find(i => i === args[0])) {
            const msg = [...args].join(" ").slice(args[0].length + 1)

            const embed = new Discord.MessageEmbed()
            .setTitle(`Przekonwertowano na ${args[0]}`)
            .setColor(colors.correctUsage)
            .setDescription(`\`${Font.apply(msg, args[0])}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    }
}
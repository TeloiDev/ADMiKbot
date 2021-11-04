module.exports = {
    name: `ship`,
    category: `fun`,
    description: "Shipuj znajomych i zobacz wynik!",
    permissions: [],
    usage: `<prefix> ship <osoba 1> [osoba 2]`,
    aliases: [`lc`, `lovecalc`, `lovemeter`],
    execute(message, args, Discord, client, prefix, colors, command){

        var Milosc = (Math.floor(Math.random()*100)+0);

        if (!args[0]){
            const embed = new Discord.MessageEmbed()
            .setColor(colors.incorrectUsage)
            .setTitle(`Podano Złe Argumenty!`)
            .setDescription(`Poprawne użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});

        } else if (!args[1]){
            const embed = new Discord.MessageEmbed()
            .setColor(`#c20808`)
            .setTitle(`LoveCalc™`)
            .setDescription(`**❤️ ${message.author} + ${args[0]} kochają się na ${Milosc}%**`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
            
        } else if (args[0] === args[1]){
            const embed = new Discord.MessageEmbed()
            .setColor(colors.incorrectUsage)
            .setTitle(`Podano Złe Argumenty!`)
            .setDescription(`Podane osoby są tą samą osobą!`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(`#c20808`)
            .setTitle(`LoveCalc™`)
            .setDescription(`**❤️ ${args[0]} + ${args[1]} kochają się na ${Milosc}%**`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    }
}
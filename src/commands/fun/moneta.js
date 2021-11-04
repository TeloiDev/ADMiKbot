module.exports = {
    name: `moneta`,
    category: `fun`,
    description: "Rzuć monetą. Wypadnie jedna z 2 stron (Nie stanie na boku)",
    permissions: [],
    usage: `<prefix> moneta`,
    aliases: [`coin`, `coinflip`, `rzut-monetą`, `cf`],
    execute(message, args, Discord, client, prefix, colors, command){
        
        const moneta = [`🦅 Wypadła orzeł`, `🪙 Wypadła reszka`];

        const embed = new Discord.MessageEmbed()
        .setColor(colors.correctUsage)
        .setTitle(`Moneta`)
        .setDescription(moneta[Math.floor(Math.random()*moneta.length)])
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send({embeds: [embed]});
    }
}

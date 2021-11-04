module.exports = {
    name: `kostka`,
    category: `fun`,
    description: "Rzuć kostką. Wypadnie jedna z 6 ścianek",
    permissions: [],
    usage: `<prefix> kostka`,
    aliases: [`kości`, `kość`, `oczka`],
    execute(message, args, Discord, client, prefix, colors, command){
            
        const oczka = [
                `Wypadło \`1\` oczko`,
                `Wypadło \`1\` oczko`,
                "Wypadły \`2\` oczka",
                "Wypadły \`3\` oczka",
                "Wypadły \`4\` oczka",
                "Wypadło \`5\` oczek",
                "Wypadło \`6\` oczek"
        ];

                const embed = new Discord.MessageEmbed()
                .setColor(colors.correctUsage)
                .setThumbnail(`https://media.discordapp.net/attachments/715603851008409641/745638579987939489/kostka.gif`)
                .setTitle(`Kostka`)
                .setDescription(oczka[Math.floor(Math.random()*oczka.length)])
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                message.channel.send({embeds: [embed]});
        }
}

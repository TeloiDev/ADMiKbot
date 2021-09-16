module.exports = {
    name: `8ball`,
    category: `fun`,
    description: "Zobacz przyszłość. Zapytaj kulę o co chcesz.",
    permissions: [],
    usage: `<prefix> 8ball <pytanie>`,
    aliases: [`ball`, `kula`, `kulka`],
    execute(message, args, Discord, client, prefix, colors, command){
        
        msg = args.join(` `);
        if (msg){
            let response = [
                '**🎱 Może kiedyś...**',
                '**🎱 Na pewno!**',
                "**🎱 Nigdy w życiu!**",
                `**🎱 Raczej tak!**`,
                `**🎱 Raczej nie...**`,
                `**🎱 Jest duże prawdopodobieństwo!**`,
                `**🎱 Wątpię**`,
                `**🎱 Prawdopodobieństwo jest tak małe że nie ma o czym gadać**`,
                `**🎱 NIE**`,
                `**🎱 TAK**`,
                `**🎱 Szanse są raczej małe, ale nie porzucaj nadziei**`,
                `**🎱 50/50 jak dla mnie**`,
                `**🎱 Tego scenariusza sobie nie wyobrażam**`,
                `**🎱 Widzę jasno! Na pewno Tak!**`
            ];

            const embed = new Discord.MessageEmbed()
            .setColor(colors.correctUsage)
            .setDescription(response[Math.floor(Math.random()*response.length)])
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});

        } else if (!msg) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.incorrectUsage)
            .setTitle(`Podano Złe Argumenty!`)
            .setDescription(`Poprawne użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}

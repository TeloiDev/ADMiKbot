
module.exports = {
    name: `8ball`,
    description: `Zapytaj o co chcesz`,
    execute(reply, interaction, Discord, client, colors, args) {

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
        .setTimestamp();
        reply(interaction, embed)
    }
}

module.exports = {
    name: `ping`,
    category: `info`,
    description: "Pokazuje ping bota",
    permissions: [],
    usage: `<prefix> ping`,
    aliases: ["latency", `ms`],
    execute(message, args, Discord){
        message.channel.send(`<a:loading:869918141373890620> Pingowanie...`).then(m => {

            const ping = m.createdTimestamp - message.createdTimestamp;

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Pong!`, `https://media.discordapp.net/attachments/757007171249504488/772903508004569088/loading.gif?width=470&height=475`)
            .setDescription(`Twój ping to **${ping}ms**`)
            .setFooter(message.author.username)
            .setTimestamp()
            m.edit({content: null, embeds: [embed]})
        });
    }
}
const api = require(`imageapi.js`);

module.exports = {
    name: `mem`,
    category: `fun`,
    description: "Losowy mem z Reddita",
    permissions: [],
    usage: `<prefix> mem`,
    aliases: [`meme`, `memey`, ],
    async execute(message, args, Discord, client, prefix, colors, command){
        
        try {
            let subreddits = [
                "dankmemes",
                "ComedyCemetery",
                "memes",
            ]
        
            let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];
            let img = await api(subreddit);

            const embed = new Discord.MessageEmbed()
            .setColor(colors.correctUsage)
            .setImage(img)
            .setTitle(`Mem`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        } catch (e) {
            console.log(e)
            return
        }
    }
}
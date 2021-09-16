const Scraper = require(`images-scraper`);

const google = new Scraper({
    puppeteer: {
        headless: true
    }
});

module.exports = {
    name: `google`,
    category: `util`,
    description: `Wysyła losowy obraz z google grafika`,
    permissions: [],
    usage: `<prefix> google <słowa-klucze>`,
    aliases: [`grafika`, `google-images`, `gi`, `img`, `google-img`, `szukaj`],
    async execute(message, args, Discord, client, prefix, colors, command){

        const image_query = args.join(` `);

        if (!image_query){
            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});

        } else {
            const image_results = await google.scrape(image_query, 30);

            const embed = new Discord.MessageEmbed()
            .setTitle(`Google Grafika: `)
            .setColor(colors.correctUsage)
            .setDescription(`<:google:847522715790737428> Wyniki dla: ` + "`" + image_query + "`")
            .setImage(image_results[Math.floor(Math.random()*(image_results.length))].url)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    }
}
const weather = require(`weather-js`);

module.exports = {
    name: `pogoda`,
    category: `util`,
    description: `Pokazuje pogodę w wybranym mieście`,
    permissions: [],
    usage: `<prefix> pogoda {Miara Temperatury(C/F)} <miasto>`,
    aliases: [`pg`, `prognoza-pogody`, `prognoza`],
    execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(" ").slice(2)
        weather.find({search: msg, degreeType: args[0]}, function (error, result){

            if(!args[0] || !args[1]){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);

            } /*else if (isNaN(args[0])){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }*/
    
            if(result === undefined || result.length === 0){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Nieprawidłowa Lokacja!`)
                .setColor(colors.incorrectUsage)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }
    
            var current = result[0].current;
            var location = result[0].location;
            


            if (args[0] === `C` || args[0] == `c`){
                type = `Celsiusz`
            } else if (args[0] == `F` || args[0] == `f`) {
                type = `Farenheit`
            }

            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Prognoza pogody dla: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(colors.correctUsage)
            .addFields(
                { name: 'Strefa Czasowa', value: `UTC${location.timezone}`, inline: true },
                { name: 'Miara Temperatury', value: type, inline: true },
                { name: 'Temperatura', value: `${current.temperature}°`, inline: true },
                { name: 'Wiatr', value: current.winddisplay, inline: true },
                { name: 'Temperatura Odczuwalna', value: `${current.feelslike}°`, inline: true },
                { name: 'Wilgotność', value: `${current.humidity}%`, inline: true }
            )
            .setTimestamp()
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(weatherinfo);
        });
    }
}
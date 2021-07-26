module.exports = {
    name: `emoji`,
    category: `info`,
    description: "Wyświetla informacje o emoji",
    permissions: [],
    usage: `<prefix> emoji <emoji>`,
    aliases: [`emoji-info`, `emotka`, `emotka-info`, `ei`],
    execute(message, args, Discord, client, prefix, colors, command){

        const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        if (!args[0]){
            return message.channel.send(embed);
        }

        for (const rawEmoji of args){
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id){
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                const embed = new Discord.MessageEmbed()
                .setColor(colors.correctUsage)
                .setTitle(parsedEmoji.name.toUpperCase())
                .setDescription(`<:emoji:847522715547729941> Podgląd: <:${parsedEmoji.name}:${parsedEmoji.id}>` + 
                `\n<:slash:847522715576958976> Id: \`${parsedEmoji.id}\`` + 
                `\n<:settings:847524392690253864> Identyfikator: \`<:${parsedEmoji.name}:${parsedEmoji.id}>\``)
                .setImage(url)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                message.channel.send(embed);

            } else {
                message.channel.send(embed);
            }
        }
    }
}
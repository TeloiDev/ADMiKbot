module.exports = {
    name: `say`,
    category: `util`,
    description: "Napisz anonimową wiadomość. Nie możesz w niej nikogo oznaczyć!!!",
    permissions: [],
    usage: `<prefix> say <wiadomość>`,
    aliases: [`powiedz`, `tell`],
    execute(message, args, Discord, client, prefix, colors, command){
        
        const embed = new Discord.MessageEmbed()
        .setColor(colors.incorrectUsage)
        .setTitle(`Podano Złe Argumenty!`)
        .setDescription(`Nie możesz oznaczać nikogo w swojej wiadomości`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        
        if (message.mentions.users.first() || 
            message.content.includes(`@everyone`) || 
            message.content.includes(`@here`)||
            message.mentions.roles.first()) return message.channel.send(embed);

        message.delete();
        msg = args.join(` `) ;
        message.channel.send(msg);
    }
}
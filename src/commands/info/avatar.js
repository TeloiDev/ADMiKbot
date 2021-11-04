module.exports = {
    name: `avatar`,
    description: `Pokazuje avatar użytkownika`,
    category: `info`,
    permissions: [],
    usage: `<prefix> avatar [@wzmianka]`,
    aliases: [`av`, `awatar`, `pfp`, `profilowe`, ],
    execute(message, args, Discord, client, prefix, colors, command){
        let user = message.mentions.users.first();
        const userId = client.users.cache.find(u => u.id === args[0]);

        if (!user) {
            if (!userId) {
                user = message.author;
                return reply();
            }

            user = userId;
            return reply();

        }

        reply();


        function reply() {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar ${user.username}`)
            .setColor(colors.correctUsage)
            .setDescription(`Pobierz: [gif](${user.avatarURL({ dynamic: true })}) | [png](${user.avatarURL({ format: `png` })}) | [webp](${user.avatarURL()})`)
            .setImage(user.avatarURL({ dynamic: true }))
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}
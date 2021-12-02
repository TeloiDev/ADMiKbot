module.exports = {
    name: `user-info`,
    category: `info`,
    description: "Uzyskaj informacje o podanym użytkowniku",
    permissions: [],
    usage: `<prefix> user-info <@wzmianka>`,
    aliases: [`ui`, `user`, `użytkownik`, `userinfo`],
    execute(message, args, Discord, client, prefix, colors, command){
        let user = message.mentions.users.first();
        let userId = client.users.cache.find(u => u.id === args[0]);

        let userStatus = {
            "online" : "<:4941_online:847523185566154772> Status: `Online`",
            "offline" : "<:offline:847522526585159701> Status: `Offline`",
            "dnd" : "<:nieprzeszkadzac:847522526468505600> Status: `Nie przeszkadzać`",
            "idle" : "<:idle:847522528100483112> Status: `Zaraz wracam`",
        };

        let isRobot = {
            "true" : "🤖 Jest robotem: `Tak`",
            "false" : "<:emoji:847522715547729941> Jest robotem: `Nie`"
        }
        
        if (!user){
            if (!userId){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send({embeds: [embed]});
            } else {
                user = userId;
                reply()
            }
        } else if (user){
            reply()
        }

        function reply() {
            const member = message.guild.members.cache.get(user.id);
            const roles = member.roles.cache.size  -1;

            let rolemap = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            
            const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}#${user.discriminator}`.toUpperCase())
            .setColor(rolemap[0].color)
            .setDescription(`<:slash:847522715576958976> ID użytkownika: `  + "`" + user.id + "`" +
            `\n<:calendar:847522715568832562> Konto utworzone: ` + "`" + new Date(user.createdTimestamp).toLocaleDateString() + "`" + 
            `\n<:calendar:847522715568832562> Dołączył do ${message.guild}: ` + "`" + new Date(member.joinedTimestamp).toLocaleDateString() + "`" + 
            `\n<:3224_info:847522715488354365> Role: ` + "`" + roles + "`" + 
            `\n${userStatus[member.presence.status]}` + 
            `\n${isRobot[user.bot]}` +
            `\n<:upvote:847522715614707712> Najwyższa rola: ${rolemap[0]}` +
            `\n<:mention:847522715690598420> Avatar:`)
            .setImage(user.avatarURL({ dynamic: true}))
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    } //
}
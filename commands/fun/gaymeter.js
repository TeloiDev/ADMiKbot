module.exports = {
    name: `gaymeter`,
    category: `fun`,
    description: "Sprawdź w ilu % jesteś gejem!",
    permissions: [],
    usage: `<prefix> gaymeter [@wzmianka]`,
    aliases: [`howgay`, `gm`, `hg`, `gay-meter`, `how-gay`, `gay`],
    execute(message, args, Discord, client, prefix, colors, command){

        var gaymeter = Math.floor(Math.random()*101);
        const u = message.mentions.users.first();
        const userId = client.users.cache.find(u => u.id === args[0]);

        if (u){
            reply(u);

        } else if (!u){
            if (userId) {
                reply(userId);
            } else {
                reply(message.author);
            }
        }

        function reply(user) {
            let thing;
            switch (user){
                case userId || u:
                    thing = ` jest`
                    break
                case message.author:
                    thing = `, jesteś`
                    break
            }
            const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Gaymeter™`)
            .setDescription(`<a:parrotGay:814426058573086720> ${user}${thing} gejem w \`${gaymeter}%\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send(embed);
        }
    }
}
module.exports = {
    name: `simp`,
    category: `fun`,
    description: "Sprawdź w ilu % jesteś simpem!",
    permissions: [],
    usage: `<prefix> simp [@wzmianka]`,
    aliases: [`simpmeter`, `simp-meter`, `sp`],
    execute(message, args, Discord, client, prefix, colors, command){

        var simp = Math.floor(Math.random()*101);
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
            .setColor(colors.correctUsage)
            .setTitle(`SimpMeter™`)
            .setDescription(`🥺 ${user}${thing} simpem w \`${simp}%\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}
module.exports = {
    name: `epicgamer`,
    category: `fun`,
    description: "Sprawdź w ilu % jesteś Epickim Gamerem!",
    permissions: [],
    usage: `<prefix> epicgamer [@wzmianka]`,
    aliases: [`eg`, `gamer`, `gejmer`, `epicgamermeter`, `epic-gamer`, `epic-gamer-meter`],
    execute(message, args, Discord, client, prefix, colors, command){

        var epic = Math.floor(Math.random()*101);
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
            .setTitle(`EpicGamerMeter™`)
            .setDescription(`<:nice:847522526280024075> ${user}${thing} Epic Gamerem w \`${epic}%\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}
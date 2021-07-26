module.exports = {
    name: `waifu`,
    category: `fun`,
    description: "Sprawdź w ilu % jesteś waifu!",
    permissions: [],
    usage: `<prefix> waifu [@wzmianka]`,
    aliases: [`waifumeter`, `waifu-meter`, `wm`],
    execute(message, args, Discord, client, prefix, colors, command){

        const waifuRate = (Math.floor(Math.random()*100)+1);
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
            .setTitle(`WaifuMeter™`)
            .setDescription(`<:senko:847533144327454762> ${user}${thing} waifu w \`${waifuRate}%\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send(embed);
        }
    }
}//
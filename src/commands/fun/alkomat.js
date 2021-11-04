module.exports = {
    name: `alkomat`,
    category: `fun`,
    description: "Sprawdź ile masz ‰ we krwi",
    permissions: [],
    usage: `<prefix> alkomat [@wzmianka]`,
    aliases: [`alko`],
    execute(message, args, Discord, client, prefix, colors, command){

        const alkomat = Math.floor(Math.random()*500) / 100;
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
                    thing = ` ma`
                    break
                case message.author:
                    thing = `, masz`
                    break
            }
            const embed = new Discord.MessageEmbed()
            .setColor(colors.correctUsage)
            .setTitle(`Alkomat™`)
            .setDescription(`<:nice:847522526280024075> ${user}${thing} \`${alkomat}‰\` alkoholu we krwi`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}
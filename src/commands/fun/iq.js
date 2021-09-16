module.exports = {
    name: `iq`,
    category: `fun`,
    description: "Sprawdź ile masz IQ!",
    permissions: [],
    usage: `<prefix> iq [@wzmianka]`,
    aliases: [`iq-test`],
    execute(message, args, Discord, client, prefix, colors, command){

        var iq = Math.floor(Math.random()*213);
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
                    thing = `🧠 IQ ${user} wynosi \`${iq}\``
                    break
                case message.author:
                    thing = `🧠 ${user}, twoje IQ wynosi \`${iq}\``
                    break
            }
            const embed = new Discord.MessageEmbed()
            .setColor(colors.correctUsage)
            .setTitle(`IQTest™`)
            .setDescription(thing)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
        }
    }
}
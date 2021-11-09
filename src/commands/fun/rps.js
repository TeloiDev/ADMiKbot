promptMessage = async function (message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    return message
        .awaitReactions({filter, max: 1, time: time})
        .then(collected => collected.first() && collected.first().emoji.name);
}

const chooseArr = ["🪨", "📰", "✂"];

module.exports = {
    name: "rps",
    category: `fun`,
    description: "Papier kamień nożyce. Zareaguj aby zagrać",
    permissions: [],
    usage: `<prefix> rps`,
    aliases: [`papierkamien`, `papierkamień`, `papier-kamień-nożyce`, `pkn`, `rock-paper-scissors`,],
    async execute(message, args, Discord, client){
        message.delete();

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setFooter(`Gracz: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setDescription("Dodaj reakcję aby zagrać!")
            .setTimestamp()


        const m = await message.channel.send({embeds: [embed]});
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit({embeds: [embed]});

        function getResult(me, clientChosen) {
            if ((me === "🪨" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🪨") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "Wygrałeś/aś!";
            } else if (me === clientChosen) {
                return "Remis!";
            } else {
                return "Przegrałeś/aś";
            }
        }        
    }
}
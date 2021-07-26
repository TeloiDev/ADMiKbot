promptMessage = async function (message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author, 
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And ofcourse, await the reactions
    return message
        .awaitReactions(filter, { max: 1, time: time})
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


        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

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
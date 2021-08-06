const Canvas = require(`canvas`);

module.exports = {
    name: `drake`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"Drake\"",
    permissions: [],
    usage: `<prefix> drake <tekst1>, <text2>`,
    aliases: [`yes-no`, `drk`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `).split(`,`);

        if (!msg[1]){
            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);
        };

        

        const canvas = Canvas.createCanvas(300, 392);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/drake.png');
        context.textAlign = `center`;
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 40;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 100);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = applyText(canvas, msg);
        context.fillStyle = '#ffffff';
        context.fillText(msg, 84, 410);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `worst-places.png`);
        message.channel.send(attachment);
    }
}
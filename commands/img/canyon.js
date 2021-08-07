const Canvas = require(`canvas`);

module.exports = {
    name: `canyon`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"canyon\". Oddziel teksty przecinkiem (,)",
    permissions: [],
    usage: `<prefix> canyon <tekst1>,<text2>`,
    aliases: [`yeet`, `canyon-yeet`, `slope`],
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

        

        const canvas = Canvas.createCanvas(683, 960);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/canyon.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 45;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 41);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '0';
        context.fillText(msg[0], 64, 93);
        context.fillText(msg[1], 407, 148);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `canyon.png`);
        message.channel.send(attachment);
    }
}
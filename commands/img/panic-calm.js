const Canvas = require(`canvas`);

module.exports = {
    name: `panic-calm`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"panic-calm\". Oddziel teksty przecinkiem (,)",
    permissions: [],
    usage: `<prefix> panic-calm <tekst1>,<text2>,<tekst3>`,
    aliases: [`kalm-panic`, `panic`, `kalm`, `panickalm`, `kalmpanic`, `calm-panic`, `calm`, `paniccalm`, `calmpanic`, `panic-kalm`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `).split(`,`);

        if (!msg[2]){
            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);
        };

        

        const canvas = Canvas.createCanvas(640, 881);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/panic-calm.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 100;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > 487);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '0';
        context.fillText(msg[0], 22, 169);
        context.fillText(msg[1], 22, 486);
        context.fillText(msg[2], 22, 777);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `panic-calm.png`);
        message.channel.send(attachment);
    }
}
const Canvas = require(`canvas`);

module.exports = {
    name: `worst-places`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"Divorce leads children to the worst places\"",
    permissions: [],
    usage: `<prefix> worst-places <tekst>`,
    aliases: [`wp`, `worstplaces`, `divorce`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `);

        const canvas = Canvas.createCanvas(526, 526);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/worst-places.png');
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
        message.channel.send(attachment)
    }
}
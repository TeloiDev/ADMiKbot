const Canvas = require(`canvas`);

module.exports = {
    name: `headaches`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"headaches\"",
    permissions: [],
    usage: `<prefix> headaches <text>`,
    aliases: [`bóle-głowy`, `types-of-headaches`, `heads`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `);

        const canvas = Canvas.createCanvas(203, 248);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/headaches.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 35;
        
            do {
                context.font = `${fontSize -= 20}px sans-serif`;
            } while (context.measureText(text).width > 10);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '0';
        context.fillText(msg, 121, 171);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `headaches.png`);
        message.channel.send(attachment);
    }
}
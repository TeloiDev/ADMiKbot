const Canvas = require(`canvas`);

module.exports = {
    name: `ordraw25`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"x or draw 25\"",
    permissions: [],
    usage: `<prefix> ordraw25 <text>`,
    aliases: [`uno`, `draw25`, `25`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `);

        const canvas = Canvas.createCanvas(500, 494);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/ordraw25.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 40;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 280);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '0';
        context.fillText(msg, 64, 235);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `ordraw25.png`);
        message.channel.send(attachment);
    }
}
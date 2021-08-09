const Canvas = require(`canvas`);

module.exports = {
    name: `button`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"Button\"",
    permissions: [],
    usage: `<prefix> button <text>`,
    aliases: [`guizk`, `bluebutton`, `button-punch`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `);

        const canvas = Canvas.createCanvas(600, 446);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/button.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 40;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 340);
        
            // Return the result to use in the actual canvas
            return context.font;
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '#FFFFFF';
        context.fillText(msg, 64, 297);

        

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `button.png`);
        message.channel.send(attachment);
    }
}
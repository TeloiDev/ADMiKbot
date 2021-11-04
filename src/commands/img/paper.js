const Canvas = require(`canvas`);

module.exports = {
    name: `paper`,
    category: `img`,
    description: "Wygeneruj meme z templatem \"paper\"",
    permissions: [],
    usage: `<prefix> paper <text>`,
    aliases: [`quiz`, `note`, `list`],
    async execute(message, args, Discord, client, prefix, colors, command){
        msg = args.join(` `);

        const canvas = Canvas.createCanvas(778, 736);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/memes/paper.png');
        
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        const applyText = (canvas, text) => {
        
            let fontSize = 40;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 222);
        
            // Return the result to use in the actual canvas
            
            return context.font
           
        };
        
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = applyText(canvas, msg);
        context.fillStyle = '0';
        context.fillText(msg, 400, 512);

        
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `paper.png`);
        message.channel.send({files: [attachment]});
    }
}
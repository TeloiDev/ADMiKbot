const Canvas = require(`canvas`);

module.exports = {
    name: `test`,
    category: `util`,
    description: "Testy deweloperów",
    permissions: [],
    usage: `<prefix> test`,
    aliases: [`testy`],
    async execute(message, args, Discord, client, prefix, colors, command){

        const canvas = Canvas.createCanvas(1000, 400);
        const context = canvas.getContext('2d');

        // const background = await Canvas.loadImage(`./assets/background.png`);

        // context.drawImage(background, 0, 0, canvas.width, canvas.height);
        


        context.strokeRect(0, 0, canvas.width, canvas.height);

	    const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'png' }));
	    context.drawImage(avatar, 500, 200 , 150, 150);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome.png`);
        message.channel.send(`siema`, attachment)
    }
}
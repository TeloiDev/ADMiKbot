const QRCode = require(`qrcode`);

module.exports = {
    name: `qr`,
    description: `Generuje kod QR do pliku tekstowego`,
    category: `util`,
    permissions: [],
    usage: `<prefix> qr <wiadomość>`,
    aliases: [`qrcode`, `qr-code`, `kodqr`, `kod-qr`],
    execute(message, args, Discord, colors, client, command, prefix){
        QRCode.toString(args.join(` `), function (err, url) {

            const embed = new Discord.MessageEmbed()
            .setTitle(`QRCode`)
            .setColor(colors.correctUsage)
            .setDescription(`\`\`\`${url}\`\`\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});

        });
    }
}
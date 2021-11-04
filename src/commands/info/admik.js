module.exports = {
    name: `admik`,
    description: `Serdecznie polecam`,
    category: `info`,
    permissions: [],
    usage: `<prefix> admik`,
    aliases: [`youtube`, `admiko`, `salomonejko`, ],
    execute(message, args, Discord, client, prefix, colors, command){
        const embed = new Discord.MessageEmbed()
        .setTitle(`ADMIK`)
        .setURL(`https://www.youtube.com/channel/UCRvsN-DKSxlbvV1EMib-XWA`)
        .setColor(colors.correctUsage)
        .setDescription(`ADMIK, recenzuje gry i od czasu do czasu streamuje\nPolecam sprawdzić`)
        .setThumbnail(`https://yt3.ggpht.com/ytc/AKedOLQWPM_Yj9fie2mAjwHCiorES2m4mr74Mzx4QQEx5Q=s88-c-k-c0x00ffffff-no-rj`)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send({embeds: [embed]});
    }
}
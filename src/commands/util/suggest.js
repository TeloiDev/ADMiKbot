const Guild = require('../../models/guild');

module.exports = {
    name: `suggest`,
    category: `util`,
    description: `Zasugeruj jakiś pomysł`,
    permissions: [],
    usage: `<prefix> suggest <wiadomość>`,
    aliases: [`sug`, `suggestion`, `pomysł`],
    async execute(message, args, Discord, client, prefix, colors, command){
        message.delete();
        msg = args.join(` `);

        const settings = await Guild.findOne({
            guildID: message.guild.id,
        }, (err, guild) => {
            if (!guild) {
                if (!msg){
                    wrongArgs();
                } else {
                    createSuggestion();
                }
            }
        });
        
        try {
            if (settings.suggestionChannel){
                if (!msg){
                    wrongArgs();
                } else {
                    if (message.channel.id === settings.suggestionChannel){
                        createSuggestion();
                    } else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`Nie ten kanał!`)
                        .setColor(colors.incorrectUsage)
                        .setDescription(`Ta komenda jest włączona dla <#${settings.suggestionChannel}> na tym serwerze!`)
                        .setTimestamp()
                        .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                        message.channel.send({embeds: [embed]});
                    }
                }
            } else {
                createSuggestion();
            }
        } catch (e) {
            return;
        }

        function createSuggestion() {

            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setColor(colors.correctUsage)
            .setDescription(msg)
            .setTimestamp()
            return message.channel.send({embeds: [embed]}).then(m => {
                m.react(`847522526422499329`);
                m.react(`847522526246600734`);
            });
        }

        function wrongArgs() {

            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    }
}
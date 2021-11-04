module.exports = {
    name: `server-info`,
    category: `info`,
    description: `Uzyskaj informacje o serwerze`,
    permissions: [],
    usage: `<prefix> server-info [ID servera]`,
    aliases: [`guild-info`, `si`, `info-server`, `guild`, `serwer`, `serwer-info`, `info-serwer`],
    async execute(message, args, Discord, client, prefix, colors, command){
        //let guildID = client.guilds.cache.find(g => g.id === args[0]);
        const category = message.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size;
        const text = message.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size;
        const voice = message.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size;
        const channels = text + voice;
        const boosts = message.guild.premiumSubscriptionCount;
        const aemojis = message.guild.emojis.cache.filter(e => e.animated).size;
        const emojis = message.guild.emojis.cache.size - aemojis;
        const bots = await message.guild.members.cache.fetch().filter(member => member.user.bot).size;
        const bots = await client.guilds.cache.get(message.guild.id).members.fetch().then(members => members.filter(member => member.user.bot).size)
        const usersTotal = message.guild.memberCount;
        const users = usersTotal - bots;

        let verifLevels = {
            "NONE" : "`Brak`",
            "LOW" : "`Niska`",
            "MEDIUM" : "`Średnia`",
            "HIGH" : "`(╯°□°）╯︵  ┻━┻`",
            "HIGHEST" : "`┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻`"
        };

        // if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setTitle(message.guild.name.toUpperCase())
            .setColor(colors.correctUsage)
            .setDescription(`<:crown:847522715530297354> Właściciel: ${await message.guild.fetchOwner()}` + 
            `\n<:slash:847522715576958976> ID Servera: \`${message.guild.id}\`` +
            `\n<:calendar:847522715568832562> Utworzony: \`${new Date(message.guild.createdTimestamp).toLocaleDateString()}\`` +
            `\n🕵️ Weryfikacja: ` + verifLevels[message.guild.verificationLevel])
            .addFields(
                { name: `Kanały: ${channels}`, value: `<:text:847522715602386984> Tekstowe ` + "`" + text + "`" +
                `\n<:voice:847522715648262204> Głosowe: ` + "`" + voice + "`" +
                `\n<:5238_categoria_emoji:847522715518369833> Kategorie: ` + "`" + category + "`", inline: true},

                { name: `Użytkownicy: ${usersTotal}`, value: `<:1618_users_logo:847522715161853984> Max: ` + "`" + message.guild.maximumMembers + "`" + 
                `\n👥 Ludzie: ` + "`" + users + "`" + 
                `\n🤖 Boty: ` + "`" + bots + "`", inline: true },

                { name: '\u200B', value: '\u200B', inline: true },
            )
            .addFields(
                { name: `Nitro`, value: `<:boost:847522715509850172> Boosty: ` + "`" + boosts +  "`" +
                `\n<:serveboost:847526047602704384> Level: ` + "`" + `${message.guild.premiumTier.split(`_`)[1]}/3` + "`", inline: true},

                { name: `Emoji: ${message.guild.emojis.cache.size}`, value: `<:emoji:847522715547729941> Zwykłe: ` + "`" + emojis + "`" +
                `\n<a:gears:847526421651390464> Animowane: ` + "`" + aemojis + "`", inline: true},
                    
                {name: '\u200B', value: '\u200B', inline: true },
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
    }
}
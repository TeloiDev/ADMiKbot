module.exports = {
    name: `server-info`,
    category: `info`,
    description: `Uzyskaj informacje o serwerze`,
    permissions: [],
    usage: `<prefix> server-info [ID servera]`,
    aliases: [`guild-info`, `si`, `info-server`, `guild`, `serwer`, `serwer-info`, `info-serwer`],
    execute(message, args, Discord, client, prefix, colors, command){
        //let guildID = client.guilds.cache.find(g => g.id === args[0]);
        const category = message.guild.channels.cache.filter(c => c.type === "category").size;
        const text = message.guild.channels.cache.filter(c => c.type === "text").size;
        const voice = message.guild.channels.cache.filter(c => c.type === "voice").size;
        const channels = text + voice;
        const boosts = message.guild.premiumSubscriptionCount;
        const aemojis = message.guild.emojis.cache.filter(e => e.animated).size;
        const emojis = message.guild.emojis.cache.size - aemojis;
        const bots = message.guild.members.cache.filter(member => member.user.bot).size;
        const usersTotal = message.guild.memberCount;
        const users = usersTotal - bots;

        let region = {
            "brazil": ":flag_br: Region: `Brazylia`",
            "europe": ":flag_eu: Region: `Europa Środkowa`",
            "singapore": ":flag_sg: Region: `Singapur`",
            "us-central": ":flag_us: Region: `Ameryka Środkowa`",
            "sydney": ":flag_au: Region: `Sydnej`",
            "us-east": ":flag_us: Region: `Ameryka Wchodnie`",
            "us-south": ":flag_us: Region: `Ameryka Południowa`",
            "us-west": ":flag_us: Region: `Ameryka Zachodnia`",
            "eu-west": ":flag_eu: Region: `Europa Zachodnia`",
            "vip-us-east": ":flag_us: Region: `VIP Ameryka Wchodnia`",
            "london": ":flag_gb: Region: `Londyn`",
            "amsterdam": ":flag_nl: Region: `Amsterdam`",
            "hongkong": ":flag_hk: Region: `Hong Kong`",
            "russia": ":flag_ru: Region: `Rosja`",
            "southafrica": ":flag_za: Region: `RPA`"
        };
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
            .setDescription(`<:crown:847522715530297354> Właściciel: ${message.guild.owner}` + 
            `\n<:slash:847522715576958976> ID Servera: \`${message.guild.id}\`` +
            `\n<:calendar:847522715568832562> Utworzony: \`${new Date(message.guild.createdTimestamp).toLocaleDateString()}\`` +
            `\n${region[message.guild.region]}` + 
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
                `\n<:serveboost:847526047602704384> Level: ` + "`" + `${message.guild.premiumTier}/3` + "`", inline: true},

                { name: `Emoji: ${message.guild.emojis.cache.size}`, value: `<:emoji:847522715547729941> Zwykłe: ` + "`" + emojis + "`" +
                `\n<a:gears:847526421651390464> Animowane: ` + "`" + aemojis + "`", inline: true},
                    
                {name: '\u200B', value: '\u200B', inline: true },
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);
        // } else if (args[0]) {
            // Guild = guildID;
// 
            // if (!Guild){
                // const embed = new Discord.MessageEmbed()
                // .setTitle(`Podano Złe Argumenty!`)
                // .setColor(colors.incorrectUsage)
                // .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
                // .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                // .setTimestamp();
                // return message.channel.send(embed);
            // } else if (Guild) {
                // const embed = new Discord.MessageEmbed()
                // .setTitle(message.guild.name.toUppercase())
                // .setDescription(`<placeholder> Właściciel: ${Guild.owner}` + 
                // `\n<placeholder> ID Servera: \`${Guild.id}\`` +
                // `\n${region[Guild.region]}` + 
                // `\n🕵️ Weryfikacja: ` + verifLevels[Guild.verificationLevel])
                // .addFields(
                    // { name: `Channels: ${channels}`, value: `<placeholder> Tekstowe ` + "`" + text + "`" 
                    // `\n<placeholder> Głosowe: ` + "`" + voice + "`" 
                    // `\n<placeholder> Kategorie: ` + "`" + category + "`", inline: true},
    // 
                    // { name: `Użytkownicy: ${usersTotal}`, value: `<placeholder> Max: ` + "`" + message.guild.maximumMembers + "`" + 
                    // `\n👥 Ludzie: ` + "`" + users + "`" + 
                    // `\n🤖 Boty: ` + "`" + bots + "`", inline: true },
    // 
                    // { name: '\u200B', value: '\u200B', inline: true },
                // )
                // .addFields(
                    // { name: `Boosts`, value: `<placeholder> Boosty: ` + "`" + boosts +  "`" +
                    // `\n<placeholder> Level: ` + "`" + `${message.guild.premiumTier}/3` + "`", inline: true},
    // 
                    // { name: `Emojis: ${message.guild.emojis.cache.size}`, value: `<placeholder> Zwykłe: ` + "`" + emojis + "`" +
                    // `\n<placeholder> Animowane: ` + "`" + aemojis + "`" + `\n\n`, inline: true},
                        // 
                    // {name: '\u200B', value: '\u200B', inline: true },
                // )
                // .setThumbnail(message.guild.iconURL({ dynamic: true }))
                // .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                // .setTimestamp();
                // return message.channel.send(embed);
            // }
            // 
        // }
    }
}
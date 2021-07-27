module.exports = {
    name: `help`,
    category: `info`,
    description: `Informacje o komendach!`,
    permissions: [],
    usage: `<prefix> help [nazwa komendy]`,
    aliases: [`pomoc`, `komendy`],
    execute(message, args, Discord, client, prefix, colors, command){
        if (!args[0]){
            const fs = require('fs');

            const util = fs.readdirSync(`commands/util`).toString().split(`.js,`).join(`, `).slice(0, -3);
            const info = fs.readdirSync(`commands/info`).toString().split(`.js,`).join(`, `).slice(0, -3);
            const fun = fs.readdirSync(`commands/fun`).toString().split(`.js,`).join(`, `).slice(0, -3);
            const config = fs.readdirSync(`commands/config`).toString().split(`.js,`).join(`, `).slice(0, -3);
            // const img = fs.readdirSync(`commands/img`).toString().split(`.js,`).join(`, `).slice(0, -3);


            const embed = new Discord.MessageEmbed()
            .setTitle(`Command List`)
            .setColor(colors.correctUsage)
            .setDescription(`Użyj komendy \`${prefix}help [nazwa komendy]\` aby dowiedzieć się więcej o konkretnej komendzie`)
            .addFields(
                { name: `<:slash:847522715576958976> Util:`, value: `\`${util}\`` },
                { name: `<:3224_info:847522715488354365> Info:`, value: `\`${info}\`` },
                { name: `<:3999activity:847522715153727545> Fun:`, value: `\`${fun}\`` },
                { name: `<:settings:847524392690253864> Config:`, value: `\`${config}\`` },
                // { name: `<:image:855511153886494720> Img:`, value: `\`${img}\`` },
                { name: `<:text:847522715602386984> Legenda:`, value: `\`[]\` jest opcjonalnym argumentem\n\`<>\` jest wymaganym argumentem\n\`{}\` to opcja\nNie wpisuj \`[], <> lub {}\` przy używaniu komend!` },
                { name: `<:5579developerbadge:847522715791523911> Dołącz po więcej pomocy!`, value: `https://discord.gg/D2YKYXx` }
            )
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);


        } else if  (args[0]){
            const vailidArgs = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(args[0]));
            if (!vailidArgs){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Podano Złe Argumenty!`)
                .setColor(colors.incorrectUsage)
                .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);
            }
    
            if (!vailidArgs.permissions.length){
                perms = `Brak`
            } else {
                perms = vailidArgs.permissions.join(`, `)
            }
            
            const embed = new Discord.MessageEmbed()
            .setTitle(vailidArgs.name.toUpperCase())
            .setColor(colors.correctUsage)
            .setThumbnail(`https://media.discordapp.net/attachments/819335533787873343/819592432362323988/question.png?width=480&height=622`)
            .setDescription(
            `\n<:3224_info:847522715488354365> Opis: ` + "`" + vailidArgs.description + "`" + 
            `\n<:5238_categoria_emoji:847522715518369833> Kategoria: ` + "`" + vailidArgs.category + "`" + 
            `\n<:slash:847522715576958976> Użycie: ` + "`" + vailidArgs.usage + "`" +
            `\n<:richpresence:847522715556773898> Aliasy: ` + "`" + vailidArgs.aliases.join(`, `)  + "`" +
            `\n<:settings:847524392690253864> Uprawnienia: \`${perms}\`` +
            `\n<:5579developerbadge:847522715791523911> Dołącz do [[tutaj]](https://discord.gg/D2YKYXx) po więcej pomocy!`)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);
        }
    }
}
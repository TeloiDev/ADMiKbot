const fs = require(`fs`);

module.exports = {
    name: `help`,
    description: `siema`,
    execute(reply, interaction, Discord, client, colors) {
        const util = fs.readdirSync(`commands/util`).toString().split(`.js,`).join(`, `).slice(0, -3);
        const info = fs.readdirSync(`commands/info`).toString().split(`.js,`).join(`, `).slice(0, -3);
        const fun = fs.readdirSync(`commands/fun`).toString().split(`.js,`).join(`, `).slice(0, -3);
        const config = fs.readdirSync(`commands/config`).toString().split(`.js,`).join(`, `).slice(0, -3);


        const embed = new Discord.MessageEmbed()
        .setTitle(`Command List`)
        .setColor(colors.correctUsage)
        .setDescription(`Użyj komendy \`/help [nazwa komendy]\` aby dowiedzieć się więcej o konkretnej komendzie`)
        .addFields(
            { name: `<:slash:847522715576958976> Util:`, value: `\`${util}\`` },
            { name: `<:3224_info:847522715488354365> Info:`, value: `\`${info}\`` },
            { name: `<:3999activity:847522715153727545> Fun:`, value: `\`${fun}\`` },
            { name: `<:settings:847524392690253864> Config:`, value: `\`${config}\`` },
            { name: `<:text:847522715602386984> Legenda:`, value: `\`[]\` jest opcjonalnym argumentem\n\`<>\` jest wymaganym argumentem\n\`{}\` to opcja\nNie wpisuj \`[], <> lub {}\` przy używaniu komend!` },
            { name: `<:5579developerbadge:847522715791523911> Dołącz po więcej pomocy!`, value: `https://discord.gg/D2YKYXx` }
        )
        .setTimestamp();

        reply(interaction, embed)
    }
}
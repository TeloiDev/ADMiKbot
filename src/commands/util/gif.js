const giphy = require('giphy-api')();

module.exports = {
    name: `gif`,
    category: `util`,
    description: "Gif z podanego zakresu",
    permissions: [],
    usage: `<prefix> gif <słowa-klucze>`,
    aliases: [`giphy`, `g`],
    async execute(message, args, Discord, client, prefix, colors, command){
        let msg = args.join(` `);

        giphy.random(msg).then(function (res) {
            message.channel.send(res.data.url);
        });
    }
}
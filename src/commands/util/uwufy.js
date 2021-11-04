module.exports = {
    name: `uwufy`,
    description: `UwU Oni-chan pwease`,
    category: `util`,
    permissions: [],
    usage: `<prefix> uwufy <text>`,
    aliases: [`uwu`,],
    execute(message, args, Discord, colors, client, command, prefix){
        msg = args.join(` `);

        const newStr = msg
        .replace(/r/g, "w")
        .replace(/n/g, "m");

        message.channel.send(newStr)
    }
}
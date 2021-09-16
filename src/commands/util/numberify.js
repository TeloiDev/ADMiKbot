module.exports = {
    name: `numberify`,
    description: `Zamienia niektóre litery na cyfry`,
    category: `util`,
    permissions: [],
    usage: `<prefix> numberify <text>`,
    aliases: [`cyfry`, `number`,],
    execute(message, args, Discord, colors, client, command, prefix){
        const str = args.join(` `)
        .replace(/e/g, "3")
        .replace(/i/g, "1")
        .replace(/a/g, "4")
        .replace(/s/g, "5")
        .replace(/o/g, "0");

        message.channel.send(str);
    }
}
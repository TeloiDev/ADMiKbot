const figlet = require(`figlet`);
const QRCode = require(`qrcode`);

module.exports = {
    name: `txt`,
    category: `util`,
    description: `Konwertuje tekst w różny sposób`,
    permissions: [],
    usage: `<prefix> txt {acii/uwufy/qr/numberify/emojify} <tekst>`,
    aliases: [`text`, `text-convert`, `text-converter`],
    execute(message, args, Discord, client, prefix, colors, command){
        const fixedargs = args.slice(1);
        
        if (!fixedargs[0]){
            const embed = new Discord.MessageEmbed()
            .setTitle(`Podano Złe Argumenty!`)
            .setColor(colors.incorrectUsage)
            .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send(embed);

        } else if (args[0] === `ascii`){
            
            msg = fixedargs.join(`\n`)

            figlet.text(msg, {
                font: "ANSI Regular",
                width: 60,


            }, function(err, data) {
                if (err) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Error!`)
                    .setColor(colors.incorrectUsage)
                    .setDescription(`Coś poszło nie tak...`)
                    .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    return message.channel.send(embed);

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`ASCII`)
                    .setColor(colors.correctUsage)
                    .setDescription('```' + data + '```')
                    .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    return message.channel.send(embed);
                }
            });
        } else if (args[0] == `uwufy`) {
            const str = fixedargs.join(` `)
            const newStr = str
            .replace(/r/g, "w")
            .replace(/n/g, "m");

            message.channel.send(newStr)

        } else if (args[0] == `qr`) {
            QRCode.toString(fixedargs.join(` `), function (err, url) {

                const embed = new Discord.MessageEmbed()
                .setTitle(`QRCode`)
                .setColor(colors.correctUsage)
                .setDescription(`\`\`\`${url}\`\`\``)
                .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
                return message.channel.send(embed);

            });

        } else if (args[0] == `numberify`) {

            const str = fixedargs.join(` `)
            .replace(/e/g, "3")
            .replace(/i/g, "1")
            .replace(/a/g, "4")
            .replace(/s/g, "5")
            .replace(/o/g, "0")

            message.channel.send(str)

        } else if (args[0] == `emojify`) {
            var finalwords = ""

            function check (suffix) {
                var thing
                switch (suffix) {
                    case ' ':
                        thing = '     '
                        break

                    case '!':
                        thing = ' :exclamation:'
                        break
                      case '?':
                        thing = ' :question:'
                        break
                      case '0':
                        thing = ' :zero:'
                        break
                      case '1':
                        thing = ' :one:'
                        break
                      case '2':
                        thing = ' :two:'
                        break
                      case '3':
                        thing = ' :three:'
                        break
                      case '4':
                        thing = ' :four:'
                        break
                      case '5':
                        thing = ' :five:'
                        break
                      case '6':
                        thing = ' :six:'
                        break
                      case '7':
                        thing = ' :seven:'
                        break
                      case '8':
                        thing = ' :eight:'
                        break
                      case '9':
                        thing = ' :nine:'
                        break
                      case '+':
                        thing = ' :heavy_plus_sign:'
                        break
                      case '-':
                        thing = ' :heavy_minus_sign:'
                        break
                      case '×':
                        thing = ' :heavy_multiplication_x:'
                        break
                      case '*':
                        thing = ' :asterisk:'
                        break
                      case '$':
                        thing = ' :heavy_dollar_sign:'
                        break
                      case '/':
                        thing = ' :heavy_division_sign:'
                        break
                      default:
                        thing = suffix
                        break
                }
                return thing;
            }
            function convert (p) {
                phrase = p.toString().toLowerCase()
                var i
                var bigWords = ''
                for (i = 1; i < phrase.length + 1; i++) {
                  if (phrase.substring(i - 1, i).match(/[a-z]/i)) {
                    var character = ' :regional_indicator_' + phrase.substring(i - 1, i) + ':'
                    bigWords = bigWords + character
                  } else {
                    bigWords = bigWords + check(phrase.substring(i - 1, i))
                  }
                }
                return bigWords.substring(1, bigWords.length)
            }
            message.channel.send(convert(fixedargs.join(` `)))


        }
    }
}
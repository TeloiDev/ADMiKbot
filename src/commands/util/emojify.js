module.exports = {
    name: `emojify`,
    description: `Zamienia twój text na emoji 😎`,
    category: `util`,
    permissions: [],
    usage: `<prefix> emojify <text>`,
    aliases: [`emoji`,],
    execute(message, args, Discord, colors, client, command, prefix){
        let finalwords = ""

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
        message.channel.send(convert(args.join(` `)))
    }
}
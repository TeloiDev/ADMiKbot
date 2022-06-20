const Guild = require("../models/guild");
const colors = require("../../assets/json/colors.json");

module.exports = async (Discord, client) =>{
    
    console.log(`Hello, World!`);
    client.user.setActivity(`Ryzyko Deszczu`, { type: `PLAYING`});

    Guild.find({}, (err, guilds) => {
        if (err) {}

        guilds.forEach(async (guildObj) => {
            if (guildObj.counting) {
                try {

                    const embed = new Discord.MessageEmbed()
                    .setColor(colors.incorrectUsage)
                    .setDescription(`Z powodu błędu następna liczba to: \`${guildObj.counting.count}\``)
                    .setTimestamp();
                
                    client.channels.cache
                    .find(ch => ch.id === guildObj.counting.countingChannel)
                    .send({embeds: [embed]})
                } catch (e) {
                    console.log(e)
                }
            }
        })
    });
}
const Guild = require(`../models/guild`);
const colors = require(`../../assets/json/colors.json`);
const validPermissions = require(`../../assets/json/permissions.json`);

module.exports = async (Discord, client, message) => {
    if (message.channel.type === `DM`) return;
    
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });
    
    try {
        if (message.channel.id === settings.memeChannel){
            if (message.attachments.size > 0){
                addReactions("vote");
            }

        } else if (message.channel.id === settings.linkChannel){
            if (message.content.includes(`https://`)){
                addReactions("vote");
            }
        }

        counting();

    } catch (e) {}

    
    let prefix;

    settings ? prefix = settings.prefix : prefix = `?`;
    

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) return;
    if(command.permissions){
        let invalidPerms = [];
        for(const perm of command.permissions){
          if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
        }
            if(!message.member.permissions.has(Discord.Permissions.FLAGS[perm])){
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length){
            const embed = new Discord.MessageEmbed()
            .setColor(colors.incorrectUsage)
            .setTitle("Brakujące Uprawnienia!")
            .setDescription(`Brakuje ci uprawnień: \`${invalidPerms.join(`, `)}\` aby wykonać komendę \`${command.name}\``)
            .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
            return message.channel.send({embeds: [embed]});
        }
    }

    try {
        command.execute(message, args, Discord, client, prefix, colors, command);
    } catch (err) {
        message.channel.send(`???`);
        console.log(err);
        return;
    }



    async function counting() {
        if (message.author.bot) return;
        let count = settings.counting.count;
        const countingChannel = settings.counting.countingChannel;

        if (message.channel.id === countingChannel) {
        

            if (Number(message.content) === count) {
                count++;
                await settings.updateOne({
                    counting: {
                        countingChannel: countingChannel,
                        count: count,
                    },
                });
                
            } else if (Number(message.content) != count) {
    
                if (message.author.id !== client.user.id) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(colors.incorrectUsage)
                    .setDescription(`${message.author} przerwał liczenie na \`${count - 1}\`\nZaczynamy od początku :')`)
                    .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    message.channel.send({embeds: [embed]});

                    client.channels.cache.find(c => c.id === countingChannel).setTopic(`Ostatnio doszliśmy do: \`${count - 1}\``);

                    await settings.updateOne({
                        counting: {
                            countingChannel: countingChannel,
                            count: 1,
                        },
                    });
                }
            }
        }
    }

    function addReactions(type) {
        const getEmoji = (id) => client.emojis.cache.find(e => e.id === id);
        switch (type){
            case "vote":
                message.react(getEmoji(`847522526422499329`));
                message.react(getEmoji(`847522526246600734`));
            break;
        }
        
    }

}
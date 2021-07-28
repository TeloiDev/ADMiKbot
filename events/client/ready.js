const fs = require(`fs`);
const colors = require(`../../colors.json`);

module.exports = async (Discord, client) =>{
    
    console.log(`Hello, World!`);
    client.user.setActivity(`Minecraft`, { type: `PLAYING`});
    

    const guildId = `598620425307684937`;

    const getApp = (guildId) => {
        const app = client.api.applications(client.user.id);
        if (guildId){
            app.guilds(guildId);
        }
        return app;
    }
    const commands = await getApp(guildId).commands.get();

    await getApp(guildId).commands.post({
        data: {
            name: `help`,
            description: `Informacje o komendach!`,
        }, data: {
            name: `8ball`,
            description: `Zapytaj o co chcesz`,
            options: [
                
                {
                    name: "pytanie",
                    description: `Zadaj pytanie`,
                    type: 3,
                    required: true
                }
            ]
        }
    })


    client.ws.on(`INTERACTION_CREATE`, async (interaction) => {
        const { name, options } = interaction.data;
        const command = interaction.data.name.toLowerCase();
        const args = {};
        
        const slashCmd = client.slash.get(command);

        try {
            slashCmd.execute(reply, interaction, Discord, client, colors, args);
        } catch (e) {
            console.error(e);
        }
    })
    


    const reply = async (interaction, response) => {
        let data = {
            content: response,
        }

        if (typeof response === `object`) {
            data = await createAPIMessage(interaction, response)
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data,
            }
        })
    }

    const createAPIMessage = async (interaction, content) => {
        const { data, files } = await Discord.APIMessage.create(
            client.channels.resolve(interaction.channel_id),
            content
        )

        .resolveData()
        .resolveFiles();

        return { ...data, files };
    }
}
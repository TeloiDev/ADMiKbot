const Discord = require(`discord.js`);
<<<<<<< HEAD
const client = new Discord.Client();
const keepAlive = require(`./server`);
=======
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
const keepAlive = require(`./server`);
>>>>>>> prototype
require(`dotenv`).config();
const mongoose = require(`mongoose`);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

[`command_handler`, `events_handler`].forEach(handler => {
    require(`./src/handlers/${handler}`)(client, Discord);
});

keepAlive();

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log(`Connected to Mongo!`);
}).catch((err) => {
    console.log(err);
});

client.login(process.env.TOKEN);
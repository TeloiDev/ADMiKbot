const fs = require(`fs`);

module.exports = (client, Discord) => {
    const slash_files = fs.readdirSync(`./commands-slash/`).filter(file => file.endsWith(`.js`))

    for(const file of slash_files){
        const command = require(`../commands-slash/${file}`);
        if(command.name){
            client.slash.set(command.name, command);
        } else {
            continue; 
        }
    }
    
}
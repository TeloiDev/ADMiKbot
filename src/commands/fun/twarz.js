module.exports = {
    name: `twarz`,
    category: `fun`,
    description: `Bot oceni twą twarz`,
    permissions: [],
    usage: `<prefix> twarz <załącznik>`,
    aliases: [`face`,],
    execute(message, args, Discord, client, prefix, colors, command){
        
        const wrongArgs = new Discord.MessageEmbed()
        .setTitle(`Podano Złe Argumenty!`)
        .setColor(colors.incorrectUsage)
        .setDescription(`Prawidłowe użycie to: \`${command.usage}\``)
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();

        if (message.attachments.size < 0) return message.channel.send(wrongArgs);

        let liczba = (Math.floor(Math.random()*11)+1);
        let ocena = [
            `Oj byczq **100/10** epicka morda`,
            `Si si toro **10/10** kozaq twarz`,
            `ÓÓÓÓ ale jesteś epicki/a, **10/10**`,
            `Widziałem nieco lepsze ale jesteś bliski/a ideału, **9/10**`,
            `Admin by nie pogardził, **7/10**`,
            `Co Ty jesteś, joe mama? **5/10**`,
            `Nałóż se Garnier czysta skóra, **4/10**`,
            `no średnio bym powiedział, **2/10**`,
            `kup se maseczke **3/10**`,
            `Masz pryszcza pod okiem **6/10**`,
            `I don’t like ya cut G, **2/10**`,
            `I like ya cut G, **9/10**`,
            `U lók like poop, **0/10**`,
            `Noice **6/9**`,
            `Szkoda gadać szkoda szczępić ryja naprawde, **1/10**`,
            `Pog? **9/10**`,
            `Do top modela to ty nie pójdziesz, **4/10**`,
            `Takie pół na pół, **5/10**`,
            `Auć płacisz odszkodowanie za moje oczy, **0/10**`,
            `Ło, **7/10**`,
            `Lepiej noś okulary, **3/10**`,
            `Oj bynjió pog, **10/10**`,
            `Jak już to obejrz poradniki wersow o makijażu, **4/10**`,
            `Hel nah, **3/10**`,
            `Ye ye alright, **7/10**`,
            `That’s some good shit, **8/10**`,
            `Is lit, **8/10**`,
            `Picasso cie malował, **10/10**`,
            `Bóg jak cie tworzył to wybrał “wybierz losowe” **1/10**`,
            `Kosmetyczka nawet tu nie pomoże **1/10**`,
            `Lubię twoją monobrew **5/10**`,
            `Brałbym **9/10**`,
            `Całkiem zacnie **7/10**`,
            `YYYYYYYY może to przemilczę **4/10**`,
            `Jakoż z profilu wygladało lepiej **6/10**`,
            `Raczej nie podpadasz w mój gust, ale nie jestem jedynym stworzeniem na świecie **4/10**`,
            `Jesteś prawie tak ładny/a jak mój stwórca! **9/10**`,
            `Moja ocena to **${liczba}/10** i zdania nie zmienię!`,
            `Masz bardzo komiczną twarz, **${liczba}/10**`,
            `Mimo to widziałem lepsze, **7/10**`,
            `Mam już dosyć! Nie wpisuj więcej tej komendy, proszę`,
            `Powinieneś/aś wymienić swoją twarz na nowszy model, **6/10**`,
            `...`
        ];

        const embed = new Discord.MessageEmbed()
        .setTitle(`TwarzRater™`)
        .setColor(colors.correctUsage)
        .setDescription(ocena[Math.floor(Math.random()*ocena.length)])
        .setFooter(`Wywołane przez: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send({embeds: [embed]});
    }
}
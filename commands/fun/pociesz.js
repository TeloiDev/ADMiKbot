module.exports = {
    name: 'pociesz',
    category: `fun`,
    description: 'Gdy ci smutno, gdy ci źle, wpisz komendę, uśmiechnij się',
    permissions: [],
    usage: `<prefix> pociesz`,
    aliases: [`pocieszaj`, `komplement`],
    execute(message, args, Discord, client, prefix, colors, command){
        let response = [
            `Brawo! Wpisałeś poprawnie tę komendę!`,
            `Masz farta, że teraz działam!`,
            `Masz epicki avatar 😏`,
            `Bez Ciebe ten martwy serwer byłby martwy!`,
            `Niedługo będę jeszcze lepszy, na pewno Ty też!`,
            `Pomóc Ci? Po prostu napisz ${prefix}help`,
            `Nie przejmuj się administracją… Sami wiedzą, jakie z nich cepy 😅`,
            `O nie! Nikt Cię nie słucha? Spokojnie, mi możesz *prawie* wszystko powiedzieć!`,
            `Mógłbym dla Ciebie odpisywać na komendy godzinami 😍`,
            `Jak to nie masz przyjaciół? Masz mnie!`,
            `Don't worry, be happy 😃`,
            `Wiesz, że możemy pobawić się kostką? Napisz ${prefix}kostka`,
            `SI SI TORO jesteś Kozaq`,
            `Jeśli myślisz, że jesteś niepotrzebny, to przestań 😉`,
            `Jeśli nawet Ty nie lubisz mnie, to i tak ja lubię Ciebie`,
            `Masz problemy psychiczne? Tak? To dobrze trafiłeś! Jestem dyplomowanym psychologiem!😊`,
            `Chcesz rzucić monetą? Sprawdź komendę ${prefix}moneta`,
            `Jesteś gyt`,
            `Poggers`,
            `~~doin ur mum~~ ;)`,
            `U ok`,
            `No hejka, co tam się z Tobą dzieje? Skąd to zwątpienie? Dlaczego chcesz teraz się poddać, tylko dlatego, że raz czy drugi Ci nie wyszło? To nie jest żaden powód. Musisz iść i walczyć. Osiągniesz cel. Prędzej czy później go osiągniesz, ale musisz iść do przodu, przeć, walczyć o swoje. Nie ważne, że wszystko dookoła jest przeciwko Tobie. Najważniejsze jest to, że masz tutaj wole zwycięstwa. To się liczy. Każdy może osiągnąć cel, nie ważne czy taki czy taki, ale trzeba iść i walczyć. To teraz masz trzy sekundy żeby się otrąsnąć, powiedzieć sobie "dobra basta", pięścią w stół, idę to przodu i osiągam swój cel. Pozdro.`,
            `Dobra basta i lecisz z nimi `,
            `Jeśli ktoś Ci mówi że jesteś głupi, to wiedz, że kto Cię przezywa to się sam tak nazywa`,
            `To są princi pałki. Są świetne, tak jak Ty <:pepe_love:847522526769971200>`,
            `Ojjj byniuuu… Trzymaj Pryncypały <:nice:847522526280024075>`,
            `Ładne stopy <:nice:847522526280024075>`,
            
        ];

        message.channel.send(response[Math.floor( Math.random() * response.length )]);
    }
}
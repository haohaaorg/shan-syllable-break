/**
 SHAN syllable break js for Shan language development.
 organization: haohaaorg
 version: 0.1
 */
class SSB {

    constructor() {
        const tones = '\u1087|\u1088|\u1038|\u1089|\u108A';
        const ngaPyet = '\u103A';
        const tits = '\u1030|\u102F';
        const ayeSai = '\u1031|\u1084';
        const ar = '\u1083';
        const breaks = '\u104A|104B';
        const kaikurn = '\u1086';
        const tarngkakyan = '\u102E';
        const consonants = '\u1075|\u1076|\u1004|\u1078|\u101E|\u107A|\u1010|\u1011|\u107C|\u1015|\u107D|\u107E|\u1019|\u101A|\u101B|\u101C|\u101D|\u1081|\u1022';

        this.toneReg = new RegExp(`[${tones}|${breaks}]`, 'gmi');
        this.frontReg = new RegExp(`[${ngaPyet}|${kaikurn}|${ar}|${tarngkakyan}]+[^${tones}]`, 'gmi');
        this.backReg = new RegExp(`[${ayeSai}]+[^${tones}|${ar}]`, 'gmi');
        this.titsReg = new RegExp(`[${consonants}]+[${tits}]+[${consonants}]+[^${ngaPyet}]`, 'gmi');
        this.singleReg = new RegExp(`[${consonants}]+[${consonants}]+[^${ngaPyet}]`, 'gmi');

    }

    // Add space behind every tones
    addSpaceBehindTones() {

        if (this.text.match(this.toneReg)) {
            this.text = this.text.replace(this.toneReg, (matched) => {
                return matched + " ";
            });
        }

    }

    // Add space between matched words
    splitMatch(pattern) {
        if (!this.text.match(pattern)) { return }
        this.text = this.text.replace(pattern, (matched) => {
            return matched.split("")[0] + " " + matched.split("")[1];
        });
    }

    // Add space between titSong
    titSongJoin(pattern) {
        if (!this.text.match(pattern)) { return }
        this.text = this.text.replace(pattern, (matched) => {
            const lastWords = matched.substr(2);
            const firstTwo = matched.substr(0, 2);
            return firstTwo + " " + lastWords;
        });
    }

    // Add space between single consonants except consonant followed by -်
    consonantJoin(pattern) {
        if (!this.text.match(pattern)) { return }
        this.text = this.text.replace(pattern, (matched) => {
            const lastChar = matched.split('').pop();
            const allCon = matched.substr(0, matched.length - 1);
            return allCon.split("").join(" ") + lastChar;
        });
    }

    // init and tokenize
    tokenize(text) {
        if(!text){
            console.error('Please provide input text!'); return;
        }
        this.text = text;
        this.addSpaceBehindTones();
        this.splitMatch(this.frontReg);
        this.splitMatch(this.backReg);
        this.titSongJoin(this.titsReg);
        this.consonantJoin(this.singleReg);
        let tokenArray = this.text.split(" ");
        return tokenArray.filter(String);
    }

    // call tokenize func and join the array
    string(text){
        let tokens = this.tokenize(text)
        return tokens?tokens.join(" "):'';
    }
}

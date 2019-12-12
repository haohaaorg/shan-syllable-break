document.querySelector(".test").addEventListener("click", e => {
    const str = document.querySelector(".str");
    let val = str.value;

    const tones = '\u1087|\u1088|\u1038|\u1089|\u108A';
    const ngaPyet = '\u103A';
    const tits = '\u1030|\u102F';
    const ayeSai = '\u1031|\u1084';
    const ar = '\u1083';
    const breaks = '\u104A|104B';
    const kaikurn = '\u1086';
    const tarngkakyan = '\u102E';
    const consonants = '\u1075|\u1076|\u1004|\u1078|\u101E|\u107A|\u1010|\u1011|\u107C|\u1015|\u107D|\u107E|\u1019|\u101A|\u101B|\u101C|\u101D|\u1081|\u1022';

    const toneReg = new RegExp(`[${tones}|${breaks}]`, 'gmi');
    const frontReg = new RegExp(`[${ngaPyet}|${kaikurn}|${ar}|${tarngkakyan}]+[^${tones}]`, 'gmi');
    const backReg = new RegExp(`[${ayeSai}]+[^${tones}|${ar}]`, 'gmi');
    const titsReg = new RegExp(`[${consonants}]+[${tits}]+[${consonants}]+[^${ngaPyet}]`,'gmi');
    const singleReg = new RegExp(`[${consonants}]+[${consonants}]+[^${ngaPyet}]`,'gmi');

    // Add space behind every tones
    if (val.match(toneReg)) {
        val = val.replace(toneReg, (matched) => {
            return matched + " ";
        });
    }

    // Add space between matched words
    function splitMatch(pattern) {
        if (!val.match(pattern)) { return }
        val = val.replace(pattern, (matched) => {
            return matched.split("")[0] + " " + matched.split("")[1];
        });
    }

    // Add space between single consonants except consonant followed by -်
    function consonantJoin(pattern) {
        if (!val.match(pattern)) { return }
        val = val.replace(pattern, (matched) => {
            const lastChar = matched.split('').pop();
            const allCon = matched.substr(0,matched.length-1);
            return allCon.split("").join(" ")+lastChar;
        });
    }

    // Add space between titSong
    function titSongJoin(pattern) {
        if (!val.match(pattern)) { return }
        val = val.replace(pattern, (matched) => {
            const lastWords = matched.substr(2);
            const firstTwo = matched.substr(0,2);
            return firstTwo+" "+lastWords;
        });
    }
    
    splitMatch(frontReg);
    splitMatch(backReg);
    titSongJoin(titsReg);
    consonantJoin(singleReg);

    document.querySelector(".res").innerHTML = val;
})
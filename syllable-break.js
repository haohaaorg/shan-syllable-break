document.querySelector(".test").addEventListener("click", e => {
    const str = document.querySelector(".str");
    let val = str.value;

    const tones = '\u1087|\u1088|\u1038|\u1089|\u108A';
    const ngaPyet = '\u103A';
    const ayeSai = '\u1031|\u1084';
    const ar = '\u1083';
    const kaikurn = '\u1086';
    const tarngkakyan = '\u102E';

    const toneReg = new RegExp(`[${tones}]`, 'gmi');
    const frontReg = new RegExp(`[${ngaPyet}|${kaikurn}|${ar}|${tarngkakyan}]+[^${tones}]`, 'gmi');
    const backReg = new RegExp(`[${ayeSai}]+[^${tones}|${ar}]`, 'gmi');


    // Add space behind every tones
    if (val.match(toneReg)) {
        val = val.replace(toneReg, (matched) => {
            return matched + " ";
        });
    }

    // Add space between between matched words
    function splitMatch(pattern) {
        if (!val.match(pattern)) { return }
        val = val.replace(pattern, (matched) => {
            return matched.split("")[0] + " " + matched.split("")[1];
        });
    }

    splitMatch(frontReg);
    splitMatch(backReg);

    document.querySelector(".res").innerHTML = val;
})
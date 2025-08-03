let numbers = [1,2,3,4,5,6,7,8,9,10];
let usedNumbers = [];

window.addEventListener('load', () => {
    const savedUsedNumbers = localStorage.getItem('usedNumbers');
    if (savedUsedNumbers) {
        usedNumbers = JSON.parse(savedUsedNumbers);
        // numbersからusedNumbersを除外
        numbers = numbers.filter(n => !usedNumbers.includes(n));
    }
});

const imageMap = {
    1: 'photo_cloud/daiya.png',
    2: 'photo_cloud/donatu.png',
    3: 'photo_cloud/hana.png',
    4: 'photo_cloud/hikouki.png',
    5: 'photo_cloud/homura.png',
    6: 'photo_cloud/oyakogame.png',
    7: 'photo_cloud/nagagutu.png',
    8: 'photo_cloud/pennginn.png',
    9: 'photo_cloud/tatunootosigo.png',
    10: 'photo_cloud/wani.png'
};
const gachaBtn = document.getElementById('gachaBtn');
const resultDiv = document.getElementById('result');

gachaBtn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => { // ここで2秒遅延
        if (usedNumbers.includes(idx)) {
            const imgSrc = imageMap[idx];
            resultDiv.innerHTML = `<img src="${imgSrc}" alt="画像${idx}">`;
        } else {
            usedNumbers.push(idx);
            numbers.splice(idx-1, 1);
            const imgSrc = imageMap[idx];
            const newBadge = `<span style="position:absolute; top:5px; right:5px; background:red; color:white; padding:2px 8px; border-radius:5px; font-size:14px; font-weight:bold; z-index:2;">NEW!</span>`;
            resultDiv.innerHTML = `<div style="position:relative; display:inline-block;">${newBadge}<img src="${imgSrc}" alt="画像${idx}" width="300"></div>`;
        }
    }, 1800); // 1.8秒（1800ミリ秒）遅延
});

function saveUsedNumbers() {
    localStorage.setItem('usedNumbers', JSON.stringify(usedNumbers));
}

gachaBtn.addEventListener('click', () => {
    setTimeout(() => {
        saveUsedNumbers();
    }, 2000); // 2秒後に保存
});
function loadSavedClouds() {
    const savedClouds = JSON.parse(localStorage.getItem('savedClouds') || '[]');
    return savedClouds;
}

function displaySavedClouds() {
    const clouds = loadSavedClouds();
    const container = document.getElementById('cloudCollection');
    
    if (!container) {
        console.warn('cloudCollection要素が見つかりません');
        return;
    }
    
    // 既存の内容をクリア
    container.innerHTML = '';
    
    if (clouds.length === 0) {
        container.innerHTML = '<p class="no-clouds">まだ雲が保存されていません</p>';
        return;
    }
    
    clouds.forEach(cloud => {
        const cloudElement = document.createElement('div');
        cloudElement.className = 'saved-cloud-item';
        cloudElement.innerHTML = `
            <div class="cloud-display">
                <div class="cloud-layer background-layer">
                    ${cloud.images.background ? `<img src="${cloud.images.background}" alt="背景">` : ''}
                </div>
                <div class="cloud-layer base-layer">
                    <img src="${cloud.images.base}" alt="ベース">
                </div>
                <div class="cloud-layer middle-layer">
                    ${cloud.images.middle ? `<img src="${cloud.images.middle}" alt="真ん中">` : ''}
                </div>
                <div class="cloud-layer top-layer">
                    ${cloud.images.top ? `<img src="${cloud.images.top}" alt="トップ">` : ''}
                </div>
            </div>
            <h3>${cloud.name}</h3>
            <p>作成日: ${new Date(cloud.createdAt).toLocaleDateString()}</p>
        `;
        container.appendChild(cloudElement);
    });
}

let numbers = [1,2,3,4,5,6,7,8,9,10];
let usedNumbers = [];

window.addEventListener('load', () => {
    const savedUsedNumbers = localStorage.getItem('usedNumbers');
    if (savedUsedNumbers) {
        usedNumbers = JSON.parse(savedUsedNumbers);
        numbers = numbers.filter(n => !usedNumbers.includes(n));
    }
    updateDaiyaVisibility();
    displaySavedClouds(); // 保存された雲を表示
});

function updateDaiyaVisibility() {
    const elements = [
        { id: 'daiya', num: 1 },
        { id: 'donatu', num: 2 },
        { id: 'hana', num: 3 },
        { id: 'hikouki', num: 4 },
        { id: 'homura', num: 5 },
        { id: 'oyakogame', num: 6 },
        { id: 'nagagutu', num: 7 },
        { id: 'pennginn', num: 8 },
        { id: 'tatunootosigo', num: 9 },
        { id: 'wani', num: 10 }
    ];

    elements.forEach(element => {
        const el = document.getElementById(element.id);
        if (el) {
            if (numbers.includes(element.num)) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        }
    });
}
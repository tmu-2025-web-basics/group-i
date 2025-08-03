const hamburgerMenu = document.querySelector('.hamburger-menu');
const navOverlay = document.querySelector('.nav-overlay');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
});

// オーバーレイをクリックしたときにメニューを閉じる
navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
        hamburgerMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    }
});

function saveCloudName() {
    const cloudName = document.getElementById('cloudNameInput').value;
    if (cloudName.trim() === '') {
        alert('雲の名前を入力してください');
        return;
    }
    
    // 名前入力モーダルを閉じる
    const nameModal = document.getElementById('nameModal');
    nameModal.style.display = 'none';
    
    // 完成した雲を表示するモーダルを開く
    showCompletionModal(cloudName);
}

function showCompletionModal(cloudName) {
    // 完成した雲の画像を組み合わせて表示
    const completedCloudDisplay = document.getElementById('completedCloudDisplay');
    completedCloudDisplay.innerHTML = `
        <div class="cloud-layer background-layer">
            ${selectedFourthImage ? `<img src="${selectedFourthImage}" alt="背景">` : ''}
        </div>
        <div class="cloud-layer base-layer">
            <img src="${selectedFirstImage}" alt="ベース">
        </div>
        <div class="cloud-layer middle-layer">
            ${selectedSecondImage ? `<img src="${selectedSecondImage}" alt="真ん中">` : ''}
        </div>
        <div class="cloud-layer top-layer">
            ${selectedThirdImage ? `<img src="${selectedThirdImage}" alt="トップ">` : ''}
        </div>
    `;

    // 4つ目の選択肢に応じて背景色を変更
    const completedCloudContainer = document.querySelector('.completed-cloud-container');
    
    // 既存の背景クラスを削除
    completedCloudContainer.classList.remove('bg-sky', 'bg-sunset', 'bg-sunrise', 'bg-rain');
    
    // 選択された4つ目の画像に応じて背景色を設定
    if (selectedFourthImage) {
        if (selectedFourthImage.includes('backGround1')) {
            completedCloudContainer.classList.add('bg-sunrise');
        } else if (selectedFourthImage.includes('backGround2')) {
            completedCloudContainer.classList.add('bg-sunset');
        } else if (selectedFourthImage.includes('backGround3')) {
            completedCloudContainer.classList.add('bg-sky');
        } else if (selectedFourthImage.includes('backGround4')) {
            completedCloudContainer.classList.add('bg-rain');
        }
    } else {
        // デフォルトは空色
        completedCloudContainer.classList.add('bg-sky');
    }
    
    // 雲の名前を表示
    const cloudNameDisplay = document.getElementById('cloudNameDisplay');
    cloudNameDisplay.textContent = cloudName;
    
    // ローカルストレージに雲を保存
    saveCloudToStorage(cloudName);
    
    // 完成モーダルを表示
    const completionModal = document.getElementById('completionModal');
    completionModal.style.display = 'flex';
}

function closeCompletionModal() {
    const completionModal = document.getElementById('completionModal');
    completionModal.style.display = 'none';
}

function restartCreation() {
    // 全てリセットして最初から
    currentStep = 1;
    selectedFirstCloud = null;
    selectedFirstImage = null;
    selectedSecondCloud = null;
    selectedSecondImage = null;
    selectedThirdCloud = null;
    selectedThirdImage = null;
    selectedFourthCloud = null;
    selectedFourthImage = null;
    
    closeCompletionModal();
    showFirstOptions();
}

function goToCollection() {
    window.location.href = '../collection/collection.html';
}

// カスタムアラート関数
function showCustomAlert(message) {
    // オーバーレイを作成
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    // アラート要素を作成
    const alert = document.createElement('div');
    alert.className = 'custom-alert';

    // ×ボタンを作成
    const closeButton = document.createElement('button');
    closeButton.className = 'alert-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', '閉じる');
    
    // メッセージテキストを作成
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    // アラートに要素を追加
    alert.appendChild(closeButton);
    alert.appendChild(messageText);
    
    // DOMに追加
    document.body.appendChild(overlay);
    document.body.appendChild(alert);
    
    // 閉じる関数
    const closeAlert = () => {
        if (document.body.contains(overlay)) document.body.removeChild(overlay);
        if (document.body.contains(alert)) document.body.removeChild(alert);
    };
    
    // イベントリスナーを追加
    overlay.addEventListener('click', closeAlert);
    closeButton.addEventListener('click', closeAlert);
    setTimeout(closeAlert, 3000);
}

// 既存のalert()をshowCustomAlert()に変更
function goToNextPage() {
    console.log('GoToNextPage called, currentStep:', currentStep);
    if (currentStep === 1) {
        if (selectedFirstCloud === null) {
            showCustomAlert('ベースの雲の形を選択してください');
            return;
        }
        currentStep = 2;
        showSecondOptions();
    } else if (currentStep === 2) {
        if (selectedSecondCloud === null) {
            showCustomAlert('真ん中の雲を選択してください');
            return;
        }
        currentStep = 3;
        showThirdOptions();
    } else if (currentStep === 3) {
        if (selectedThirdCloud === null) {
            showCustomAlert('トップの雲を選択してください');
            return;
        }
        currentStep = 4;
        showFourthOptions();
    } else {
        showNameModal();
    }
}

function saveCloudName() {
    const cloudName = document.getElementById('cloudNameInput').value;
    if (cloudName.trim() === '') {
        showCustomAlert('雲の名前を入力してください');
        return;
    }
    
    // 名前入力モーダルを閉じる
    const nameModal = document.getElementById('nameModal');
    nameModal.style.display = 'none';
    
    // 完成した雲を表示するモーダルを開く
    showCompletionModal(cloudName);
}

function saveCloudToStorage(cloudName) {
    // 作成した雲のデータをオブジェクトにまとめる
    const cloudData = {
        id: Date.now(), // ユニークID
        name: cloudName,
        images: {
            background: selectedFourthImage,
            base: selectedFirstImage,
            middle: selectedSecondImage,
            top: selectedThirdImage
        },
        createdAt: new Date().toISOString()
    };
    
    // 既存の雲データを取得
    const existingClouds = JSON.parse(localStorage.getItem('savedClouds') || '[]');
    
    // 新しい雲データを追加
    existingClouds.push(cloudData);
    
    // ローカルストレージに保存
    localStorage.setItem('savedClouds', JSON.stringify(existingClouds));
    
    console.log('雲が保存されました:', cloudData);
}
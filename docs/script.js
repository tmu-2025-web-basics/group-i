window.addEventListener('DOMContentLoaded', () => {
  const g9 = document.querySelector('.g9');
  setTimeout(() => {
    g9.style.animationPlayState = 'paused';
  }, 20000);

  let isAnimating = false;
  let canClickImage = true;

  function showElements() {
    document.querySelector('.e9797')?.classList.add('show');
    document.querySelector('.r106')?.classList.add('show');
  }
  function hideElements() {
    document.querySelector('.e9797')?.classList.remove('show');
    document.querySelector('.r106')?.classList.remove('show');
  }

  document.querySelector('.f5')?.addEventListener('click', function() {
    canClickImage = false;
    setTimeout(() => {
      canClickImage = true;
    }, 2000);

    if (isAnimating) return;
    isAnimating = true;

    this.classList.add('rotate', 'disabled');
    document.querySelector('.e44')?.classList.add('rotate');

    setTimeout(() => {
      this.classList.remove('rotate', 'disabled');
      document.querySelector('.e44')?.classList.remove('rotate');
      isAnimating = false;
    }, 2000);

    const p = this.querySelector('.p');
    if (p) {
      p.style.display = 'none';
      setTimeout(() => {
        p.style.display = '';
      }, 2000);
    }

    showElements();
  });

  const ell62 = document.querySelector('.ell62');

  function showEll62() {
    if (ell62) {
      ell62.classList.add('show');
      setTimeout(() => {
        ell62.classList.remove('show');
      }, 700);
    }
  }

  document.querySelectorAll('.r106, .e9797').forEach(el => {
    el.addEventListener('click', function() {
      resultDiv.innerHTML = ""; // 画像を消す
      // 既存の処理
      if (isAnimating) return;
      showEll62();
      isAnimating = true;
      hideElements();
      setTimeout(() => {
        isAnimating = false;
      }, 100);
    });
  });

  // 画像クリック禁止処理
  resultDiv.addEventListener('click', function(e) {
    if (!canClickImage) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 画像クリック時の処理（ページ遷移など）
  });
});
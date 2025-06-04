document.querySelectorAll('.wishlist-btn').forEach((btn) => {
  const restaurantBox = btn.closest('.restaurant-list');
  const restaurantName = restaurantBox.querySelector('.restaurant-list__textBox__name').innerText;

  // 초기 상태 로드
  if (isWishlisted(restaurantName)) {
    btn.classList.add('liked');
    btn.innerHTML = '❤️';
    btn.dataset.liked = 'true';
  }

  btn.addEventListener('click', (event) => {
    event.stopPropagation(); // 지도 클릭 막기

    const isLiked = btn.classList.toggle('liked');
    btn.dataset.liked = isLiked;
    btn.innerHTML = isLiked ? '❤️' : '🤍';

    if (isLiked) {
      saveWishlist(restaurantName);
    } else {
      removeWishlist(restaurantName);
    }
  });
});

function saveWishlist(name) {
  const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
  if (!list.includes(name)) {
    list.push(name);
    localStorage.setItem('wishlist', JSON.stringify(list));
  }
}

function removeWishlist(name) {
  let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
  list = list.filter(item => item !== name);
  localStorage.setItem('wishlist', JSON.stringify(list));
}

function isWishlisted(name) {
  const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return list.includes(name);
}
// 페이지 로드 후, 모든 카드에 버튼 추가
document.querySelectorAll('.restaurant-list').forEach(card => {
  // 이미 생성된 경우 스킵
  if (card.querySelector('.wishlist-btn')) return;

  const btn = document.createElement('button');
  btn.className = 'wishlist-btn';
  btn.dataset.liked = 'false';
  btn.title = '찜하기';
  btn.textContent = '🤍';
  card.appendChild(btn);  // ← card에 직접 붙입니다

  // (아래 코드는 기존에 붙어 있던 초기 로드/클릭 로직과 통합해주세요)
  const name = card.querySelector('.restaurant-list__textBox__name').innerText;
  if (isWishlisted(name)) {
    btn.classList.add('liked');
    btn.textContent = '❤️';
    btn.dataset.liked = 'true';
  }
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const liked = btn.classList.toggle('liked');
    btn.dataset.liked = liked;
    btn.textContent = liked ? '❤️' : '🤍';
    liked ? saveWishlist(name) : removeWishlist(name);
  });
});


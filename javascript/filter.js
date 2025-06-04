const tagBtnContainer = document.querySelector('.tag-filter__tags');
const restaurantContainer = document.querySelector('.restaurant-lists');
const restaurants = document.querySelectorAll('.restaurant-list');

tagBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) return;

  restaurantContainer.classList.add('anim-out');

  setTimeout(() => {
    restaurants.forEach((restaurant) => {
      if (filter === '*') {
        restaurant.classList.remove('invisible');
      } 
      else if (filter === 'wishlist') {
        const name = restaurant.querySelector('.restaurant-list__textBox__name').innerText;
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (wishlist.includes(name)) {
          restaurant.classList.remove('invisible');
        } else {
          restaurant.classList.add('invisible');
        }
      } 
      else {
        if (filter === restaurant.dataset.type) {
          restaurant.classList.remove('invisible');
        } else {
          restaurant.classList.add('invisible');
        }
      }
    });
    restaurantContainer.classList.remove('anim-out');
  }, 280);
});
document.querySelectorAll('.restaurant-list').forEach(card => {
  const btn = document.createElement('button');
  btn.className = 'wishlist-btn';
  btn.dataset.liked = 'false';
  btn.title = '찜하기';
  btn.textContent = '🤍';
  card.appendChild(btn); // 카드 제일 바깥 div에 붙임

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 지도 이동 방지
    const liked = btn.dataset.liked === 'true';
    btn.dataset.liked = liked ? 'false' : 'true';
    btn.textContent = liked ? '🤍' : '❤️';
  });
});
document.getElementById('tagMoreBtn').addEventListener('click', () => {
  document.querySelectorAll('.tag-filter__tag.more').forEach(el => el.classList.toggle('hidden'));
});

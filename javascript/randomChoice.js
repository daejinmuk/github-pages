const randChoiceBtn = document.querySelector(".top-bars__choice");
const restaurantAllList = document.querySelectorAll(".restaurant-list");
const topbarsHeight = document.querySelector(".top-bars").offsetHeight;
var randomRestaurant;

var restaurantObj = function(index, offsetTop) {
  this.index = index;
  this.offsetTop = offsetTop;
}

function getRestaurants() {
  var restaurantLists = [];
  var restaurantIndex = -1;
  restaurantAllList.forEach(restaurant => {
    restaurantIndex += 1;
    if (restaurant.classList.value.search("invisible") === -1) {
      restaurantLists.push(new restaurantObj(restaurantIndex, restaurant.offsetTop));
    }
  })
  return restaurantLists;
}

function choiceRestaurant() {
  if(randomRestaurant !== undefined) {
    restaurantAllList[randomRestaurant.index].lastElementChild.style.backgroundColor = "white";
  }
  const restaurants = getRestaurants();
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  randomRestaurant = restaurants[randomIndex];
  window.scrollTo({top:randomRestaurant.offsetTop - topbarsHeight * 5, behavior:"smooth"});
  restaurantAllList[randomRestaurant.index].lastElementChild.style.backgroundColor = "#93c2eb";
};

randChoiceBtn.addEventListener("click", choiceRestaurant)
// 전역에 이전 선택 저장용
let prevIndex = null;

function choiceRestaurant() {
  // 1) 이전에 하이라이트된 카드 있으면 해제
  if (prevIndex !== null) {
    const prevBox = restaurantAllList[prevIndex]
                      .querySelector('.restaurant-list__textBox');
    prevBox.style.backgroundColor = '';
  }

  // 2) 랜덤 카드 고르고 스크롤
  const restaurants = getRestaurants();
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  randomRestaurant = restaurants[randomIndex];
  window.scrollTo({
    top: randomRestaurant.offsetTop - topbarsHeight * 5,
    behavior: "smooth"
  });

  // 3) 그 카드의 텍스트박스에 하이라이트
  const textBox = restaurantAllList[randomRestaurant.index]
                   .querySelector('.restaurant-list__textBox');
  textBox.style.backgroundColor = "#93c2eb";

  // 4) 선택 기록
  prevIndex = randomRestaurant.index;
}

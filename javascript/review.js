document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
  
    categories.forEach(cat => {
      cat.addEventListener("click", () => {
        cat.classList.toggle("selected");
      });
    });
  
    // 제목 설정
    const name = localStorage.getItem("selectedRestaurant");
    const titleEl = document.getElementById("restaurant-title");
    if (titleEl) {
      if (name) {
        titleEl.textContent = `"${name}" 리뷰 작성`;
      } else {
        titleEl.textContent = "리뷰 작성";
      }
    }
  
    // 전역 함수 등록
    window.submitReview = function () {
      const selected = Array.from(document.querySelectorAll(".category.selected"))
        .map(cat => cat.textContent);
      const reviewText = document.getElementById("reviewText").value.trim();
  
      if (!reviewText) {
        alert("리뷰 내용을 입력해주세요.");
        return;
      }
  
      // 임시 제출 확인
      alert(`✅ 리뷰가 제출되었습니다!\n\n카테고리: ${selected.join(", ")}\n내용: ${reviewText}`);
  
      // 초기화
      document.querySelectorAll(".category").forEach(cat => cat.classList.remove("selected"));
      document.getElementById("reviewText").value = "";
    };
  
    // goToReview 함수도 전역으로 필요할 경우 등록
    window.goToReview = function (restaurantName) {
      localStorage.setItem("selectedRestaurant", restaurantName);
      window.location.href = "review.html";
    };
  });
  
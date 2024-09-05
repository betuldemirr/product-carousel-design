// Betül Demir 
// Insider | Software Techhub Project

(() => {
     const init = () => {
          buildHTML();
          buildCSS();
          setEvents();
     };

     const buildHTML = () => {
          const products = getProductsFromLocalStorage();
          if (products) {
               const productHTML = `
                    <div class="carousel-products-container">
                         <p class="carousel-products-title">Product Carousel Design</p>
                         <div class="carousel-container">
                              <div class="carousel-wrapper">
                              ${products.map((product) => `
                                   <div class="carousel-item">
                                        <div class="product-card">
                                             <div class="favorite-btn ${getFavoritesFromLocalStorage().includes(product.id.toString()) ? 'favorite' : ''}" data-id="${product.id}">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                                                       <path class="heart-path" fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                                                  </svg>
                                             </div>
                                             <div class="product-card-image-wrapper">
                                                  <a href="${product.url}" target="_blank">
                                                       <img src="${product.img}" alt="${product.name}">
                                                  </a>
                                             </div>
                                             <div class="product-card-information-box">
                                                  <p class="product-name">
                                                       <a href="${product.url}" target="_blank">${product.name}</a>
                                                  </p>
                                                  <div class="product-price">${product.price.toFixed(2)} TL</div>
                                             </div> 
                                        </div>
                                   </div>
                              `).join('')}
                              </div>
                         </div>
                         <div class="carousel-buttons">
                              <button type="button" class="carousel-prev-btn">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                                        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                                   </svg>
                              </button>
                              <button type="button" class="carousel-next-btn">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242" style="transform: rotate(180deg);">
                                        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                                   </svg>
                              </button>
                         </div>
                    </div>
             `;
               $('.product-detail').append(productHTML);
          } else {
               fetchProducts();
          }
     };

     const buildCSS = () => {
          const css = `
               .carousel-products-container {
                    position: relative;
                    width: 90%;
                    margin: 0 auto;
                    padding: 30px 0;
               }
               .carousel-products-title {
                    font-size: 32px;
               }
               .carousel-container {
                    position: relative;
                    overflow: hidden;
               }
               .carousel-wrapper {
                    display: flex;
                    transition: transform 0.3s ease-in-out;
                    width: 100%;
               }
               .carousel-item {
                    flex: 0 0 15.5%;
                    box-sizing: border-box;
                    padding: 10px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
               }
               .product-card {
                    background-color: #fff;
                    position: relative;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    box-sizing: border-box;
               }
               .product-card-information-box {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 10px;
               }
               .favorite-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    padding: 0;
                    width: 34px;
                    height: 34px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .16);
                    border: solid .5px #b6b7b9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
               }
               .favorite-btn .heart-path {
                    fill: transparent;
                    transition: fill 0.3s;
               }
               .favorite-btn.favorite .heart-path {
                    fill: #193db0;
               }
               .product-name a {
                    text-decoration: none;
                    color: #302e2b;
                    font-size: 14px;
                    line-height: 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
               }
               .product-price {
                    color: #193db0;
                    font-size: 15px;
                    line-height: 15px;
               }
               .carousel-item img {
                    max-width: 100%;
                    height: auto;
               }
               .carousel-buttons {
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    transform: translateY(-50%);
                    left: 0;
                    z-index: 10;
               }
               .carousel-prev-btn, .carousel-next-btn {
                    background: none;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                    z-index: 20;
               }
               .carousel-prev-btn {
                    margin-left: -30px;
               }
               .carousel-next-btn {
                    margin-right: -30px;
               }

               /* Responsive styles */
               @media (max-width: 576px) {
                    .carousel-products-title {
                         font-size: 24px;
                    }
                    .carousel-item {
                         flex: 0 0 75%;
                    }
               }
               @media (min-width: 576px) and (max-width: 768px) {
                    .carousel-products-title {
                         font-size: 28px;
                    }
                    .carousel-item {
                         flex: 0 0 40%;
                    }
               }
               @media (min-width: 768px) and (max-width: 992px) {
                    .carousel-products-title {
                         font-size: 30px;
                    }
                    .carousel-item {
                         flex: 0 0 30%;
                    }
               }
               @media (min-width: 992px) {
                    .carousel-products-container {
                         width: 80%;
                    }
               }
         `;

          $('<style>').addClass('carousel-style').html(css).appendTo('head');
     };

     const setEvents = () => {
          let currentIndex = 0;

          const updateCarousel = () => {
               const totalItems = $('.carousel-item').length;
               const visibleItems = 7;
               const translateValue = `translateX(-${(currentIndex / (totalItems - visibleItems)) * 100}%)`;
               $('.carousel-wrapper').css('transform', translateValue);
          };

          $('.carousel-next-btn').on('click', () => {
               const totalItems = $('.carousel-item').length;
               const visibleItems = 7;

               if (currentIndex < totalItems - visibleItems) {
                    currentIndex++;
                    updateCarousel();
               }
          });

          $('.carousel-prev-btn').on('click', () => {
               if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
               }
          });

          $('.favorite-btn').on('click', function () {
               const id = $(this).data('id').toString();
               let favorites = getFavoritesFromLocalStorage();

               if (favorites.includes(id)) {
                    favorites = favorites.filter(fav => fav !== id);
                    $(this).removeClass('favorite');
               } else {
                    favorites.push(id);
                    $(this).addClass('favorite');
               }

               saveFavoritesToLocalStorage(favorites);
          });
     };

     const fetchProducts = () => {
          fetch("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json")
               .then((response) => response.json())
               .then((products) => {
                    localStorage.setItem('products', JSON.stringify(products));
                    buildHTML();
               })
               .catch((error) => console.error("Error fetching products:", error));
     };

     const getProductsFromLocalStorage = () => {
          return JSON.parse(localStorage.getItem('products'));
     };

     const getFavoritesFromLocalStorage = () => {
          try {
               return JSON.parse(localStorage.getItem('favorites')) || [];
          } catch (error) {
               console.error("Error parsing favorites from localStorage:", error);
               return [];
          }
     };

     const saveFavoritesToLocalStorage = (favorites) => {
          try {
               localStorage.setItem('favorites', JSON.stringify(favorites));
          } catch (error) {
               console.error("Error saving favorites to localStorage:", error);
          }
     };

     init();
})();
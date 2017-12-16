// Immediately Invoked Function Expression
// IIFE

(function () {
  var galleryLightbox = document.querySelector('.gallery-lightbox');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var closeButton = document.querySelector('.gallery-button-close');
  var nextButton = document.querySelector('.gallery-button-next');
  var previousButton = document.querySelector('.gallery-button-previous');

  var galleryItemIndex = 0;

  function createGalleryNavigation() {
    var navigationItemHtml = '<li class="gallery-navigation-item"><a class="gallery-navigation-button"></a></li>';
  
    var navigation = document.querySelector('.gallery-navigation');
  
    for(var i = 0; i < galleryItems.length; i++) {
    navigation.innerHTML += navigationItemHtml;
    }
  }

  createGalleryNavigation();

  var navItems = document.querySelectorAll('.gallery-navigation-button');

  function showGallery() {
    galleryLightbox.style.display = 'block';
  }

  function hideGallery() {
    galleryLightbox.style.display = 'none';
  }

  function updateNavigation() {
    for(var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('active');
    }
  
    navItems[galleryItemIndex].classList.add('active');
  }

  function showImage() {
    var imageUrl = galleryItems[galleryItemIndex].getAttribute('gallery-full-image');
  
    var img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'openItem';
  
    var galleryContent = document.querySelector('.gallery-content');
    var oldImage = galleryContent.querySelector('img');
    if (oldImage) {
      galleryContent.removeChild(oldImage);
    }
  
    galleryContent.appendChild(img);
  
    updateNavigation();
  }

  function getItemIndex(items, item) {
    return Array.from(items).indexOf(item);
  }

  function onGalleryItemClick(event) {
    var clickedGalleryItem = event.currentTarget;
  
    showGallery();
    galleryItemIndex = getItemIndex(galleryItems, clickedGalleryItem);
    showImage();
  }

  for(var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener('click', onGalleryItemClick);
  }

  function onCloseButtonClick() {
    hideGallery();
  }

  closeButton.addEventListener('click', onCloseButtonClick);

  function onNextButtonClick() {
    galleryItemIndex++;
    if (galleryItemIndex === galleryItems.length) {
      galleryItemIndex = 0;
    }
    showImage();
  }

  nextButton.addEventListener('click', onNextButtonClick);


  function onPreviousButtonClick() {
    galleryItemIndex--;
    if (galleryItemIndex === -1) {
      galleryItemIndex = galleryItems.length - 1;
    }
    showImage();
  }

  previousButton.addEventListener('click', onPreviousButtonClick);

  function onNavigationButtonClick(event) {
    var clickedNavigationItem = event.currentTarget;
  
    galleryItemIndex = getItemIndex(navItems, clickedNavigationItem);
    showImage();
  }

  for(var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', onNavigationButtonClick);
  }
  
  
  function onKeyUp(event) {
    if (event.which === 27) {
      //Escape key up
      hideGallery();
      
    } else if (event.which === 39) {
      //Arrow right key up
      onNextButtonClick();
      
    } else if (event.which === 37) {
      //Arrow left key up
      onPreviousButtonClick();
      
    }
  }
  
  
  
  document.body.addEventListener('keyup', onKeyUp);

}());





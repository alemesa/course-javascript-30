 //Debounce function
 function debounce(func, wait = 20, immediate = true) {
     var timeout;
     return function() {
         var context = this,
             args = arguments;
         var later = function() {
             timeout = null;
             if (!immediate) func.apply(context, args);
         };
         var callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(context, args);
     };
 }


 const sliderImages = document.querySelectorAll('.slide-in');

 function checkSlide(e) {
     sliderImages.forEach(sliderImage => {
         // half way through the image
         const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 4;
         // bottom of the image
         const imageBottom = sliderImage.offsetTop + sliderImage.height;
         const isHalfShown = slideInAt > sliderImage.offsetTop;
         const isNotScrolledPast = window.scrollY < imageBottom;
         if (isHalfShown && isNotScrolledPast) {
             sliderImage.classList.add('active');
         } else {
             sliderImage.classList.remove('active');
         }

         //  window.scrollY -->  is how much you have scroll vertical
         //  window.innerHeight -->  is the height of the window (fixed)
         //  -> put together they represent the bottom of the page
         //  slideImage.height -->  is the height of each image
         //  slideInAt -->  will calculate when the image is peaking on the bottom
         // --------------------------------------------------------------------
         //  slideImage.offsetTop -->  is how far they are from the beginning of the page (fixed)
         //  slideImage.height -->  is the height of each image 
         //  -> put together they are the bottom of each image on the page
         //  -------------------------------------------------------------------
         //  isHalfShown = slideInAt > slideImage.offsetTop  
         //  -> this will be true only when the image is peaking  
         //  isNotScrolledPast = window.scrollY < imageBottom
         //  -> this will be true when the image is on the screen

     });
 }

 window.addEventListener('scroll', debounce(checkSlide));
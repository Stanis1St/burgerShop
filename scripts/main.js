///мобильное меню 
function mobileMenu () {
    const navTrigger =document.querySelector('.nav-trigger');
    const trigger =document.querySelector('.nav-trigger__link');
    const navMobile =document.querySelector('.nav-mobile');
    const navItems =document.querySelectorAll('.nav-mobile__item');

    trigger.addEventListener('click',toggleClass);
    
    for (const i of navItems) {
        i.addEventListener('click',toggleClass);
    }


    function toggleClass (e){
        e.preventDefault();
        navTrigger.classList.toggle('is-active');
        navMobile.classList.toggle('is-active');
    }
}

mobileMenu ();



//// slider burgers
function mySlider (){
    const right=document.querySelector('.scroll-btn_right');
    const left=document.querySelector('.scroll-btn_left');
    const list =document.querySelector('.slider__list');
    const items =list.querySelectorAll('.slider__item');

  left.addEventListener('click',moveLeft);
  right.addEventListener('click',moveRight);
  let num=2;

    function moveRight(){
       
       num++; 
        if(num>items.length){
            num=1;
        }

        setOrder();
        list.classList.remove('is-reverse');
        moveItem();


    }

    function moveLeft(){
        num--;
        if(num===0){
            num=items.length;
        }
        setOrder();
        list.classList.add('is-reverse');
        moveItem();
    }


    function setOrder(){
        let key=num;
        for (const i of items) {
            i.style.order=key;
            key++;
            if (key>items.length){
                key=1;
            }
        }
    }

    function moveItem(){
        list.classList.remove('is-move');
        setTimeout(()=>{
            list.classList.add('is-move');
        }, 50);
    }




}
mySlider();


////аккордеон тим

$(function(){
    let $wraps=$('.team-acco__content-wrap');
	$('.team-acco__trigger').on('click', function(e){
        e.preventDefault();
        let $current= $(this).parents('.team-acco__item').find('.team-acco__content-wrap');
       console.log($current);
       $($wraps).not($current).slideUp(500).parents('.team-acco__item').removeClass('is-active');
       $current.slideToggle(500).parents('.team-acco__item').toggleClass('is-active');
        
	});
	


   

/// overlay 
const openButton = document.querySelector("#openOverlay");
const successOverlay = createOverlay("Привет, <b>loftschool</b>!");
console.log(openButton);
openButton.addEventListener("click", function() {
    document.body.appendChild(successOverlay);
  });
  

  function createOverlay(content) {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
  
    const template = document.querySelector("#overlayTemplate");
    overlayElement.innerHTML = template.innerHTML;
  
    const closeElement = overlayElement.querySelector(".close");
    closeElement.addEventListener("click", function() {
      document.body.removeChild(overlayElement);
    });
  
    const contentElement = overlayElement.querySelector(".content");
    contentElement.innerHTML = content;
  
    return overlayElement;
  }

});


///acccordeon menu


function accordionMenu (){
    const menuItems = document.querySelectorAll('.menu__item');
    const menuAccord = document.querySelector('.menu__accordion');
    menuAccord.addEventListener('click',event => {
        event.preventDefault();
        let target =event.target.parentNode;
        let content =target.nextElementSibling;
        let item =target.parentNode;

        const tarWidth=target.clientWidth;
        const windowWidth =document.documentElement.clientWidth;
        const layoutContentWidth =520;
        const breakpointPhone = 480 ;
        const closeMenuWidth= tarWidth *menuItems.length;
        const openMenuWidth = closeMenuWidth +layoutContentWidth;

        if(event.target.classList.contains('menu__title')){
            moveMenu();

        }
        
        target=event.target
        content=target.nextElementSibling;
        item=target.parentNode;
        
        
        if (target.classList.contains('menu__link')){
            moveMenu();

        }


        function moveMenu (){
            for (const iterator of menuItems) {
                if (iterator !=item){
                    console.log(iterator);

                    iterator.classList.remove('is-active');
                   iterator.lastElementChild.style.width = 0;
                   menuAccord.style.transform= `translateX(0)`;
                }
            }

            if (item.classList.contains('is-active')){
             item.classList.remove('is-active');
               content.style.width = 0 ;
            }else  {
                item.classList.add('is-active');
                content.style.width = layoutContentWidth + 'px';
                if (windowWidth > breakpointPhone && windowWidth < openMenuWidth) {
                  content.style.width = windowWidth - closeMenuWidth + 'px';
                } else if (windowWidth <= breakpointPhone) {
                  let num;
                  for (let i = 0; i < menuItems.length; i++) {
                    if (menuItems[i] === item) {
                      num = menuItems.length - (i + 1);
                    }
                    menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
                    content.style.width = windowWidth - tarWidth + 'px';
                  }
                } else {
                  content.style.width = layoutContentWidth + 'px';
                }
              }


        }

    })
}

accordionMenu();

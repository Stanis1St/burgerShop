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
       $current.slideToggle(500).parents('.team-acco__item').addClass('is-active');
        
	});
	

});
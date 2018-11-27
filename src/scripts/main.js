window.onload = function() {


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

    let $wraps=$('.team-acco__content-wrap');
	$('.team-acco__trigger').on('click', function(e){
        e.preventDefault();
        let $current= $(this).parents('.team-acco__item').find('.team-acco__content-wrap');
       $($wraps).not($current).slideUp(500).parents('.team-acco__item').removeClass('is-active');
       $current.slideToggle(500).parents('.team-acco__item').toggleClass('is-active');
        
	});
	


   

/// overlay 
const openButton = document.querySelectorAll(".openOverlay");

let overlayDesc =document.querySelectorAll('.reviews__text');
let overlayDescTitle =document.querySelectorAll('.reviews__title');
//console.log(overlayDescTitle[0].innerHTML);
//const successOverlay = createOverlay('title','text');

for (i=0 ; i<openButton.length;i++){
    let current = i;

    openButton[i].addEventListener("click", (e)=> {
        event.preventDefault();
      // elem=openButton[current];
        //    console.log(elem);
    document.body.appendChild(createOverlay( overlayDesc[current] , overlayDescTitle[current]     )   );
  });

}

  function createOverlay(  textIn ,titleIn) {
   //  console.log(titleIn);
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
  
    const template = document.querySelector("#overlayTemplate");

    overlayElement.innerHTML = template.innerHTML;
    overlayElement.addEventListener("click", e => {
        if (e.target === overlayElement) {
            document.body.removeChild(overlayElement);
        }
      });
   
    const closeElement = overlayElement.querySelector(".close");
    closeElement.addEventListener("click", function(e) {
        e.preventDefault();
      document.body.removeChild(overlayElement);
    });
   
    let contentElement = overlayElement.querySelector(".content");
    if (titleIn != undefined){
        let title = contentElement.querySelector(".overlay__title");
        let text = contentElement.querySelector(".overlay__text");
    
        title.innerHTML=titleIn.innerHTML;
        text.innerHTML=textIn.innerHTML;
    }else{

        let text = contentElement.querySelector(".overlay__text");
        
        if(typeof textIn ==='string'){

         //   console.log(text.textContent);
           text.textContent = textIn;
        }else{
        text.innerHTML=textIn.innerHTML;
        }

    }
 
  

    return overlayElement;
  
  }




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


///order 
const myForm =document.querySelector('.form');
const send =document.querySelector('#send');


send.addEventListener('click',event => {
 
    event.preventDefault();

    if(validateForm(myForm)){




        let formData = new FormData(myForm);
        formData.append("name", myForm.elements.name.value);
        formData.append("phone", myForm.elements.phone.value);
        formData.append("comment", myForm.elements.comment.value);
        formData.append("to", 'mail@mail.com');
       ///  console.log(formData);

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST','https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            if (xhr.status <=400 ) {
                         const message = xhr.response.message;
                        document.body.appendChild( createOverlay(message) )
//
            }else {
                const message ='Что-то пошло не так';
                document.body.appendChild( createOverlay(message) )

            }
          });
          
        }

})


let phone = document.querySelector('#phone');
phone.addEventListener('keydown', function(event){
    let isDigit = false ;
    let isDash = false;
    let isControl = false;
    let isPaste = false;
    if (event.key >= 0 || event.key <= 9){
        isDigit = true;
    }
    if (event.key =='-'){
        isDash=true;
    }
    if (event.key  ==='ArrowLeft'||event.key  ==='ArrowRight'||event.key  ==='Backspace'){
        isControl =true;
    }

    if (!isDigit && !isDash && !isControl){
        event.preventDefault();
    }
})


function validateForm(form){
    let valid = true ;
    if (!validField(form.elements.name)){
        valid=false;

    }
     if(!validField(form.elements.phone)){
        valid=false;

    }
    

    if(!validField(form.elements.comment)){
        valid=false;

    }
    
    return valid;
}
function validField(field){
    if(!field.checkValidity()){
       // field.nextElementSibling.textContent=field.validationMessage;
        return false;
    }else {
  //  field.nextElementSibling.textContent = '';
    return true;
    }

}









}
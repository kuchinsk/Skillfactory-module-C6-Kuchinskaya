const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')
btn1.addEventListener('click', ()=>{
    alert(`Ширина вашего экрана ${window.screen.width}px \nВысота вашего экрана ${window.screen.height}px`)
})
btn2.addEventListener('click', ()=>{
    alert(`Ширина окна с полосой прокрутки${window.innerWidth}px \nВысота окна с полосой прокрутки${window.innerHeight}px`)
})
btn3.addEventListener('click', ()=>{
    alert(`Ширина окна без полосы прокрутки ${document.documentElement.clientWidth}px \nВысота окна без полосы прокрутки ${document.documentElement.clientHeight}px`)
})
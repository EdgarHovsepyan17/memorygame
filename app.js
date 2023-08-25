const start=document.querySelector('.start')
const startBtn=document.querySelector('.start-btn')
const section=document.querySelector('section')
const playerLivesCount=document.querySelector('.player-lives')
let playerLives=7
let winStatement=false;

playerLivesCount.innerText=playerLives

//get data

const getData=()=>[
    {src:'img/big-ben.jpg',name:"big-ben"},
    {src:'img/effel.jpg',name:"effel tower"},
    {src:'img/garni.jpg',name:"garni"},
    {src:'img/liberty.jpg',name:"liberty statue"},
    {src:'img/opera.jpg',name:"opera"},
    {src:'img/pisa.jpg',name:"pisa"},
    {src:'img/pyramid.jpg',name:"pyramid"},
    {src:'img/tatev.jpg',name:"tatev"},    
    {src:'img/big-ben.jpg',name:"big-ben"},
    {src:'img/effel.jpg',name:"effel tower"},
    {src:'img/garni.jpg',name:"garni"},
    {src:'img/liberty.jpg',name:"liberty statue"},
    {src:'img/opera.jpg',name:"opera"},
    {src:'img/pisa.jpg',name:"pisa"},
    {src:'img/pyramid.jpg',name:"pyramid"},
    {src:'img/tatev.jpg',name:"tatev"}
]

const randomize=()=>{
    const data=getData()
    data.sort(()=>Math.random()-0.5)
    return data
}


function cardGenerator(){
    const data=randomize();
    

    data.forEach((item)=>{

        const card=document.createElement('div')
        card.classList.add('card')
        card.setAttribute('name',item.name)

        const face=document.createElement('img')
        face.classList.add('face')
        face.src=item.src

        const back=document.createElement('div')
        back.classList.add('back')

        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener('click',(e)=>{
            card.classList.add('toggle')
            checkTarget(e)
            if(playerLives===0){
                setTimeout(()=>{
                    restartFoo("YOU LOST TRY AGAIN!")
                },1000)
            }
            
            if(winStatement){
                setTimeout(()=>{
                    winStatement=false
                    restartFoo('YOU WON TRY TO WIN AGAIN!')
                },1000)               
            }
        })
    })
}

function checkTarget(e){
    const clickedCard=e.target;
    clickedCard.classList.add('flipped')
    const flippedCards=document.querySelectorAll('.flipped')
    if(flippedCards.length===2){
        if(flippedCards[0].getAttribute('name')===flippedCards[1].getAttribute('name')){
            flippedCards.forEach(card=>{
                card.classList.remove('flipped')
                card.style.pointerEvents='none'
            })
                const cards=document.querySelectorAll('.card')
                for(let i=0;i<cards.length;i++){
                    
                    winStatement=cards[i].classList.contains("toggle")
                    if(winStatement===false){
                        debugger
                        return
                    } 
                }
            
        }else{
            flippedCards.forEach(card=>{
                card.classList.remove('flipped')
                setTimeout(()=>{
                    card.classList.remove('toggle')
                    
                },1000)
            })
            playerLives--
            playerLivesCount.innerText=playerLives
        }
    }

}

function restartFoo(statementText){
    section.innerHTML=''
    const restart=document.querySelector('.restart')
    const restartBtn=document.querySelector('.restart-btn')
    const statement=document.querySelector('.statement')
    statement.innerText=statementText
    restart.classList.add('open')
    restartBtn.addEventListener('click',()=>{
        playerLives=7
        restart.classList.remove('open')
        cardGenerator()
        playerLivesCount.innerText=playerLives
    })
}

startBtn.addEventListener('click',()=>{
    const livesText=document.querySelector('h1')
    livesText.style.opacity=1
    section.style.opacity=1
    start.style.opacity=0;
    start.style.pointerEvents='none'
    cardGenerator()
})


document.addEventListener("DOMContentLoaded", ()=>{
    if (localStorage.getItem('figura') != null){
        let array = JSON.parse(localStorage.getItem('figura'))
        console.log(array)
        array.forEach((item, index)=>{
            // console.log(document.getElementsByClassName('wrapper')[0])
            // document.getElementsByClassName('wrapper')[0].insertAdjacentHTML('beforeend', item)

            let figura = new MyFigura()
            figura.setAttribute('nameWrapper', 'wrapper') 
            figura.setAttribute('svg_html', item)     
            figura.setAttribute('_id', `svg-${index}`)    
            document.body.append(figura)
        })
    }
});

function delFigura(){
    localStorage.clear('figura')
}

function saveFigura(){
    let numFigures = Number(localStorage.getItem('numFigures'))
    let svg_array = []
    for (let i=0; i< numFigures; i++){
        svg_array.push(document.getElementById(`svg-${i}`).outerHTML)
    }
    localStorage.setItem('figura', JSON.stringify(svg_array))
}

function addMyFigura(){

    document.getElementsByClassName('wrapper')[0].innerHTML = ''

    const numFigures = 10
    localStorage.setItem('numFigures', numFigures);
    if (1<=(numFigures) && (numFigures)<=10){
        let i=0
        while (i<numFigures){
        let figura = new MyFigura()
            figura.setAttribute('width', "100")
            figura.setAttribute('height', "100")
            figura.setAttribute('numberPoint', "5")
            figura.setAttribute('color', "red")
            figura.setAttribute('_id', `svg-${i}`)
            figura.setAttribute('nameWrapper', 'wrapper') 
            figura.setAttribute('svg_html', '')     
            
            i++ 

            document.body.append(figura)
        }
    } 
}
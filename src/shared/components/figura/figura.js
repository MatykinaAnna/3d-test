class MyFigura extends HTMLElement {
  constructor() {
    super();

    setTimeout(()=>{
        console.log(`${this.getAttribute('_id')}`)
        var figura = document.getElementById(`${this.getAttribute('_id')}`);
        figura.onmousedown = function(e) {
            var coords = getCoords(figura);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            figura.style.position = 'absolute';
            //document.body.appendChild(figura);
            moveAt(e);

            figura.style.zIndex = 1000; // над другими элементами

            function moveAt(e) {
                figura.style.left = e.pageX - shiftX + 'px';
                figura.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            figura.onmouseup = function() {
                document.onmousemove = null;
                figura.onmouseup = null;

                let left = figura.style.left.split('px')[0]
                let top = figura.style.top.split('px')[0]

                console.log(left) 
                console.log(top) 
            };
        }
        figura.ondragstart = function() {
            return false;
        };

        function getCoords(elem) {   // кроме IE8-
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    })
    
  }

  connectedCallback() {

    console.log('connectedCallback', this)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", this.getAttribute('width'));
    svg.setAttribute("height", this.getAttribute('height'));
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    let strCoordinats = ''
    for (let i=0; i<Number(this.getAttribute('numberPoint')*2); i++){
        strCoordinats = strCoordinats + this.randomInteger(0, this.getAttribute('width'))
        if (i !== Number(this.getAttribute('numberPoint'))*2-1){
            strCoordinats = strCoordinats + ','
        }
    }
    polygon.setAttribute("points", strCoordinats); 
    polygon.setAttribute("fill", this.getAttribute('color'));

    svg.appendChild(polygon);

    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.width = `${this.getAttribute('width')}px`
    div.style.height = `${this.getAttribute('height')}px`
    div.setAttribute('id', this.getAttribute('_id'))
    div.append(svg)

    document.getElementsByClassName(this.getAttribute('nameWrapper'))[0].appendChild(div)
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  static get observedAttributes() {
    return [/* массив имён атрибутов для отслеживания их изменений */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }

  // у элемента могут быть ещё другие методы и свойства

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}

customElements.define("my-figura", MyFigura);



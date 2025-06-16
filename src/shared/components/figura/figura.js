class MyFigura extends HTMLElement {
  constructor() {
    super();

    setTimeout(()=>{
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

                let zoonTop = document.getElementsByClassName('y-axis')[0].getBoundingClientRect().top

                if (zoonTop < top){
                  figura.classList.add('inWorkPlace')
                } else {
                  figura.classList.remove('inWorkPlace')
                }
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

    if (this.getAttribute('svg_html') == ''){
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", this.getAttribute('width'));
      svg.setAttribute("height", this.getAttribute('height'));
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  
      let strCoordinats = ''
      let cx = this.randomInteger(0, this.getAttribute('width'))
      let cy = this.randomInteger(0, this.getAttribute('width'))
      let radius = this.getAttribute('width')
      let angle = 30
  
      for (let i=0; i<Number(this.getAttribute('numberPoint')); i++){
          //strCoordinats = strCoordinats + this.randomInteger(0, this.getAttribute('width'))
          strCoordinats = strCoordinats + this.getCoordinate(cx, cy, radius, angle)
          if (i !== Number(this.getAttribute('numberPoint'))-1){
              strCoordinats = strCoordinats + ','
          }
          angle += (2 * 3,14159 / this.getAttribute('numberPoint')) * (1 + this.randomInteger(-0.5, 0.5))
          if (angle > 2 * 3,14159){
            angle = angle - 2 * 3,14159
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
    } else {
      document.getElementsByClassName(this.getAttribute('nameWrapper'))[0].insertAdjacentHTML('beforeend', this.getAttribute('svg_html'))
    }
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

  getCoordinate(cx, cy, radius, angle){
    let x = cx + radius * Math.cos(angle)
    let y = cy + radius * Math.sin(angle)

    return String(x) + ', ' + String(y)
  }

}

customElements.define("my-figura", MyFigura);



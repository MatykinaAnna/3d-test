class CoordinateField extends HTMLElement {
  constructor() {
    super();

    setTimeout(()=>{
    })
    
  }

  connectedCallback() {

    console.log('connectedCallback', this)
    var height = 500, 
        width = 2000, 
        margin = 30;    
        
    var createNewCoordinate = this.createNewCoordinate
        
    var svg = d3.select(`div#${this.getAttribute('_id')}`).append("svg")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", function () {
                console.log(this)
                let k = d3.zoomTransform(this).k
                svg.select('.x-axis').remove()
                svg.select('.y-axis').remove()
                svg.select('.grid-line').remove()
                createNewCoordinate(k, height, width, d3, margin, svg)
            }))
    
    // длина оси X= ширина контейнера svg - отступ слева и справа
    var xAxisLength = width - 2 * margin;     
    
    // длина оси Y = высота контейнера svg - отступ сверху и снизу
    var yAxisLength = height - 2 * margin;
        
    // функция интерполяции значений на ось Х  
    var scaleX = d3.scaleLinear()
                .domain([0, 400])
                .range([0, xAxisLength]);
    var scaleY = d3.scaleLinear()
                .domain([100, 0])
                .range([0, yAxisLength]);
                
    // создаем ось X   
    var xAxis = d3.axisBottom(scaleX)
                .ticks(40);    
    var yAxis = d3.axisLeft(scaleY)
                .ticks(10); 
                
    // отрисовка оси               
    svg.append("g")       
        .attr("class", "x-axis")
        .attr("id", "x-axis")
        .attr("transform",  // сдвиг оси вниз и вправо
            "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
                
    svg.append("g")       
        .attr("class", "y-axis")
        .attr("id", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
                "translate(" + margin + "," + margin + ")")
        .call(yAxis);
    
    // создаем набор вертикальных линий для сетки   
    d3.selectAll("g.x-axis g.tick")
        .append("line") // добавляем линию
        .classed("grid-line", true) // добавляем класс
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength));
        
    // рисуем горизонтальные линии 
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);

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

  createNewCoordinate(k, height, width, d3, margin, svg){
    let height1 = height 
    let width1 = width 
    console.log(height1, width1)

    let xAxisLength = width1 - 2 * margin;
    let yAxisLength = height1 - 2 * margin;

    let scaleX = d3.scaleLinear()
        .domain([0, 400/k])
        .range([0, xAxisLength]);
    let scaleY = d3.scaleLinear()
        .domain([100/k, 0])
        .range([0, yAxisLength]);
    let xAxis = d3.axisBottom(scaleX)
                .ticks(40);
    let yAxis = d3.axisLeft(scaleY)
                .ticks(10);

    // отрисовка оси               
    svg.append("g")       
        .attr("class", "x-axis")
        .attr("transform",  // сдвиг оси вниз и вправо
            "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
                
    svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
                "translate(" + margin + "," + margin + ")")
        .call(yAxis);
    
    // создаем набор вертикальных линий для сетки   
    d3.selectAll("g.x-axis g.tick")
        .append("line") // добавляем линию
        .classed("grid-line", true) // добавляем класс
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength));
        
    // рисуем горизонтальные линии 
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
  }
}

customElements.define("coordinate-field", CoordinateField);



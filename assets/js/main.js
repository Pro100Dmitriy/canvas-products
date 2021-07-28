import '../sass/main.sass'

document.addEventListener('DOMContentLoaded', event => {


//const $IMG = document.getElementById('plugin-img').getBoundingClientRect()
//const WIDTH = $IMG.width
//const HEIGHT = $IMG.height
//const DPI_WIDTH = WIDTH * 2
//const DPI_HEIGHT = HEIGHT * 2


function chart( canvas, data ){
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT

    let renderPoints = []

    function render(){
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = "red"
        for(const [x, y] of renderPoints){
            ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.closePath()

        render_from_LC()
    }

    function render_from_LC(){
        let all_path = []
        if( localStorage.getItem('path') ){
            all_path = JSON.parse( localStorage.getItem('path') ) 
        }

        all_path.forEach( item => {
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.strokeStyle = "red"
            for(const [x, y] of item.path){
                ctx.lineTo(x, y)
            }
            ctx.stroke()
            ctx.closePath()
        } )
        
    }

    function click(event){
        let x = event.clientX
        let y = event.clientY

        renderPoints.push([x * 2, y * 2])
        
        render()
    }
    canvas.addEventListener('click', click)


    let new_path = document.getElementById('new-path')
    let finish_path = document.getElementById('finish-path')
    let save_path = document.getElementById('save-path')

    new_path.addEventListener('click', new_path_func)
    finish_path.addEventListener('click', finish_path_func)
    save_path.addEventListener('click', save_path_func)

    function new_path_func(event){
        canvas.addEventListener('click', click)
    }
    function finish_path_func(event){
        let x = renderPoints[0][0]
        let y = renderPoints[0][1]

        renderPoints.push([x, y])

        render()
        save_LC()
        canvas.removeEventListener('click', click)
        renderPoints = []
    }
    function save_path_func(event){
        console.log('save')
    }


    function save_LC(){
        let all_objects = []
        if( localStorage.getItem('path') ){
            all_objects = JSON.parse( localStorage.getItem('path') ) 
        }
        
        let product = {
            id: '1',
            color: 'red',
            path: renderPoints,
            points: devider(renderPoints)
        }

        all_objects.push( product )

        localStorage.removeItem( 'path' )
        //localStorage.setItem( 'path', JSON.stringify( all_objects ) )
    }


    function devider(rendPoints){
        let x = rendPoints.map( item => item[0] )

        let minX = Math.min( ...x )
        let maxX = Math.max( ...x )

        let points_array = []

        for(let x = minX; x < maxX; x++){
            renderPoints.forEach( (point, index) => {
                console.log( intersection( x, [point, rendPoints[index+1]] ) )
                // if( intersection( x, [point, rendPoints[index+1]] ) != [] ){
                //     points_array.push( intersection( x, [point, rendPoints[index+1]] ) )
                // }
            } )
        }

        return null
    }


    function intersection( x, line ){
        let k = ( line[1][1] - line[0][1] ) / ( line[1][0] - line[0][0] )
        let b = line[0][1] - k * line[0][0]

        if( x >= line[0][0] && x <= line[1][0] ){
            return  [x, k*x+b]
        }else{
            return false
        }
    }


    render()

}


//chart( document.getElementById('plugin-canvas'), [] )





} )
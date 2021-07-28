import '../sass/main.sass'
import { tooltip, overlay } from './tooltip'
import { product_data } from './data'
import { css } from './utils'

function svghover( $container, { main_svg_ID, overflow_svg_ID, img_ID }, prod_data ){

    const main_svg = $container.querySelector(main_svg_ID)
    const overflow_svg = $container.querySelector(overflow_svg_ID)
    const img = $container.querySelector(img_ID)

    const over_polygon = overflow_svg.querySelectorAll('polygon')
    const over_path = overflow_svg.querySelectorAll('path')
    const main_polygon = main_svg.querySelectorAll('polygon')
    const main_path = main_svg.querySelectorAll('path')
    const tip = tooltip( $container.querySelector('[data-el="tooltip"]') )
    const title = $container.querySelector('[data-el="title"]')
    const over = overlay( document.querySelector('[data-el="overlay"]') )

    over_polygon.forEach( polygon => polygon.addEventListener('mousemove', mousemove) )
    over_path.forEach( path => path.addEventListener('mousemove', mousemove) )

    over_polygon.forEach( polygon => polygon.addEventListener('mouseleave', mouseleave) )
    over_path.forEach( path => path.addEventListener('mouseleave', mouseleave) )

    over_polygon.forEach( polygon => polygon.addEventListener('click', click) )
    over_path.forEach( path => path.addEventListener('click', click) )

    function mousemove( { target, clientX, clientY } ){
        let el_class = target.getAttribute('class')
        css( title, {display: 'none'} )

        const polygoHover = ( figure, index, array ) => {
            if( figure.getAttribute('class') != el_class ){
                img.style = 'opacity: 0.25'  
                figure.style = 'fill: #3e3e3e;'               
            }else{
                figure.style = 'fill: white;'
                let el_class = figure.getAttribute('class')
                const data = {
                    title: prod_data[el_class].title,
                    price: prod_data[el_class].price
                }
                tip.show({
                    left: clientX,
                    top: clientY
                }, data)
            }
        }
        main_polygon.forEach( polygoHover )
        main_path.forEach( polygoHover )
    }

    function mouseleave(event){
        tip.hide()
        css( title, {display: 'block'} )

        const polygonLeave = ( figure, index, array ) => {
            img.style = 'opacity: 1'
            figure.style = 'fill: white;'
        }
        main_polygon.forEach( polygonLeave )
        main_path.forEach( polygonLeave )
    }

    function click(evenr){
        over.show()
    }

}


svghover( document.querySelector('.plugin-container'), {
    main_svg_ID: '#main_svg',
    overflow_svg_ID: '#overlay_svg',
    img_ID: '#plugin-img'
}, product_data )
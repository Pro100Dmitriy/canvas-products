import "./import-liberis"
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
        css( title, {
            top: 65 + '%',
            opacity: 0
        } )

        const polygoHover = ( figure, index, array ) => {
            if( figure.getAttribute('class') != el_class ){
                css( img, {
                    opacity: 0.35,
                    filter: 'blur(1px)'
                } ) 
                css( figure, {fill: '#3e3e3e'} ) 
                
                let indexAttr = figure.getAttribute('class').slice(-1)
                css( document.querySelector('.svg_mask_img_' + indexAttr), {filter: 'blue(1px)'} )
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
        css( title, {
            top: 60 + '%',
            opacity: 1
        } )

        const polygonLeave = ( figure, index, array ) => {
            css( img, {
                opacity: 1,
                filter: 'blur(0px)'
            } )
            css( figure, { fill: 'white' } )

            let indexAttr = figure.getAttribute('class').slice(-1)
            css( document.querySelector('.svg_mask_img_' + indexAttr), { filter: 'blur(0px)' } )
        }
        main_polygon.forEach( polygonLeave )
        main_path.forEach( polygonLeave )
    }

    function click( { target } ){
        const over_data = prod_data[ target.getAttribute('class') ]

        over.show({
            title: over_data.title,
            price: over_data.price,
            description: over_data.description,
            img: over_data.img
        })

        document.querySelector('#close-overlay-menu-button').addEventListener( 'click', e => over.hide() )

        $("#overlay-slick").slick({
            infinite: true,
            dots: false
          });

    }

}


svghover( document.querySelector('.plugin-container'), {
    main_svg_ID: '#main_svg',
    overflow_svg_ID: '#overlay_svg',
    img_ID: '#plugin-img'
}, product_data )
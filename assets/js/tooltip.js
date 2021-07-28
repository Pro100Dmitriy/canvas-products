import { css } from './utils'

const template = (data) => `
    <div class="tooltip-title">${data.title}</div>
    <div class="tooltip-price">${data.price}</div>
`

export function tooltip($el){
    const clear = () => { $el.innerHTML = '' }
    return {
        show( {left, top}, data ) {
            const { height, width } = $el.getBoundingClientRect()
            clear()
            css($el, {
                display: 'block',
                top: top + height - 20 + 'px',
                left: left + width / 3 + 'px'
            })
            $el.insertAdjacentHTML( 'afterbegin', template(data) )
        },
        hide() {
            css($el, { display: 'none' })
        }
    }
}


/***************************** ------------- *****************************/


const overlay_template = (data) => `
    <div id="overlay-slick" class="overlay-container__content__img">
        ${data.img.map( src => {
            return `<div class="slick-item">
                        <img src="${src}" alt="image">
                    </div>`
        } ).join('/n')}
    </div>
    <div class="overlay-container__content__text">
        <div class="close-overlay-button">
            <button id="close-overlay-menu-button" class="close-button">Close Overlay Menu</button>
        </div>
        <h3>${data.title}</h3>
        <div class="overlay-rating">
            ${data.price}
        </div>
        <p class="overlay-description">${data.description}</p>
        <div class="overlay-add-to-cart">
            <button type="submit" class="el-form__button">Добавить в корзину</button>
        </div>
    </div>
`


export function overlay($el){
    const bg = $el.querySelector('.overlay-container__bg')
    const content = $el.querySelector('.overlay-container__content')
    const clear = () => { content.innerHTML = '' }
    return {
        show( data ){
            clear()
            css($el, {
                display: 'block'
            })
            setTimeout( () => {
                css( bg, {
                    opacity: 1
                } )
                css( content, {
                    opacity: 1,
                    transform: 'scale(1) translate(-50%, -50%)'
                } )
            }, 200 )
            content.insertAdjacentHTML( 'afterbegin', overlay_template(data) )
        },
        hide(){
            css( content, {
                opacity: 0,
                transform: 'scale(0.8) translate(-50%, -50%)'
            } )
            css( bg, {
                opacity: 0
            } )
            setTimeout( () => css($el, { display: 'none' }), 200 )
        }
    }
}
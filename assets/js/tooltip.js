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


const overlay_template = (data) => `
    <div class="overlay-container__content__img">
        <img src="#" alt="image">
    </div>
    <div class="overlay-container__content__text">
        <h3>Плед 1</h3>
    </div>
`


export function overlay($el){
    const content = $el.querySelector('.overlay-container__content')
    const clear = () => { content.innerHTML = '' }
    return {
        show(){
            clear()
            css($el, { display: 'block' })
            content.insertAdjacentHTML( 'afterbegin', overlay_template() )
        },
        hide(){
            css($el, { display: 'none' })
        }
    }
}
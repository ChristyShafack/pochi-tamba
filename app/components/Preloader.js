import GSAP from 'gsap'

import Component from 'classes/Component'

import each from 'lodash/each'

import { split } from 'utils/text'

export default class Preloader extends Component {
  constructor () {
    super({
      classes: {
      },
      element: '.preloader',
      elements: {
        title: '.preloader__text'
      }
    })
    this.elements.titleSpans = split({
      append: true,
      element: this.elements.title,
      expression: ' <br> '
    })

    each(this.elements.titleSpans, element => {
      split({
        append: false,
        element,
        expression: ' '
      })
    })

    this.length = 0
    this.createLoader()
    this.onComplete()
  }

  createLoader () {
    this.animateIn = GSAP.timeline()

    this.animateIn.set(this.elements.title, {
      autoAlpha: 1
    })

    each(this.elements.titleSpans, (line, index) => {
      const letters = line.querySelectorAll('span')

      const onStart = _ => {
        GSAP.fromTo(letters, {
          autoAlpha: 0,
          display: 'inline-block',
          y: '100%'
        }, {
          autoAlpha: 1,
          delay: 0.2,
          display: 'inline-block',
          duration: 1,
          ease: 'back.inOut',
          stagger: 0.015,
          y: '0%'
        })
      }

      this.animateIn.fromTo(line, {
        autoAlpha: 0,
        y: '100%'
      }, {
        autoAlpha: 1,
        delay: 0.2 * index,
        duration: 1.8,
        onStart,
        ease: 'ease.inOut',
        y: '0%'
      }, 'start')
    })
  }

  onComplete () {
    return new Promise(resolve => {
      this.emit('completed')

      this.animateOut = GSAP.timeline({
        delay: 6
      })

      each(this.elements.titleSpans, (line, index) => {
        const letters = line.querySelectorAll('span')

        const onStart = _ => {
          GSAP.to(letters, {
            autoAlpha: 0,
            delay: 0.2,
            display: 'inline-block',
            duration: 7,
            ease: 'back.inOut',
            stagger: 0.015,
            y: '-100%'
          })
        }

        this.animateOut.to(line, {
          autoAlpha: 0,
          delay: 0.2 * index,
          duration: 3,
          onStart,
          ease: 'expo.inOut',
          y: '-100%'
        }, 'start')
      })

      this.animateOut.to(this.elements.Text, {
        autoAlpha: 0,
        duration: 3,
        ease: 'expo.inOut'
      }, 'start')

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        duration: 1
      })

      this.animateOut.call(_ => {
        this.destroy()
      })
    })
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}

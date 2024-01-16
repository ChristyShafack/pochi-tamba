import Component from 'classes/Component'

export default class extends Component {
  constructor () {
    super({
      classes: {},
      element: '.navigation',
      elements: {
      }
    })
  }

  /**
   * Animations.
   */
  async show (url) {
    this.element.classList.add(this.classes.active)
    return super.show(url)
  }

  async hide (url) {
    this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }
}
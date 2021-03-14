export const XMLNS = 'http://www.w3.org/2000/svg'

/**
 * Renderer producing SVG output.
 */
export class SvgElement {
  private readonly e: Element
  private readonly iconSize: number

  constructor(size: number) {
    this.e = document.createElementNS(XMLNS, 'svg')
    this.iconSize = size

    // Set viewBox attribute to ensure the svg scales nicely.
    this.e.setAttribute('width', `${this.iconSize}px`)
    this.e.setAttribute('height', `${this.iconSize}px`)
    this.e.setAttribute('viewBox', `0 0 ${this.iconSize} ${this.iconSize}`)
    // element.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  }

  /**
   * Fills the background with the specified color.
   * @param color - The fill color on the format #rrggbb
   * @param opacity - The opacity in the range [0.0-1.0]
   */
  setBackground(color: string, opacity: number) {
    _append(this.e, 'rect', {
      'width': '100%',
      'height': '100%',
      'opacity': `${opacity}`,
      'fill': color,
    })
  }

  /**
   * Appends a path to the SVG element.
   * @param color - Fill color on format #rrggbb
   * @param dataString - The SVG path data string
   */
  appendPath(color: string, dataString: string) {
    _append(this.e, 'path', {
      'd': dataString,
      'fill': color,
    })
  }
}

/**
 * Append an element to the SVG.
 * @param parent - The parent element
 * @param name
 * @param props
 */
function _append(parent: Element, name: string, props: KeyValue) {
  const element = document.createElementNS(XMLNS, name);
  for (let key of Object.keys(props)) {
    element.setAttribute(key, props[key])
  }
  parent.appendChild(element)
}

type KeyValue = {
  [index: string]: string
}

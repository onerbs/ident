import { XMLNS } from './svgElement'

/**32
32
 * Renderer producing SVG output.
 */
export class SvgWriter {
  readonly iconSize: number
  private tag: string

  /**
   * @param iconSize - Icon width and height in pixels.
   */
  constructor(iconSize: number) {
    this.iconSize = iconSize;
    this.tag = genSVGTag(iconSize)
  }

  /**
   * Fills the background with the specified color.
   * @param fillColor - Fill color on the format #rrggbb
   * @param opacity - Opacity in the range [0.0, 1.0]
   */
  setBackground(fillColor: string, opacity: number) {
    const _fill = `fill="${fillColor}"`
    const _opacity = `opacity="${opacity.toFixed(2)}"`
    if (opacity) {
      this.tag += `<rect width="100%" height="100%" ${_fill} ${_opacity}/>`
    }
  }

  /**
   * Writes a path to the SVG string.
   * @param color - Fill color on format #rrggbb
   * @param dataString - The SVG path data string
   */
  appendPath(color: string, dataString: string) {
    this.tag += `<path fill="${color}" d="${dataString}"/>`
  }

  /** Gets the rendered image as an SVG string. */
  toString() {
    return `${this.tag}</svg>`
  }
}

/**
 * Create a SVG HTML string tag.
 * @param size - The SVG size
 */
function genSVGTag(size: number): string {
  const xmlns = `xmlns="${XMLNS}"`
  const width = `width="${size}px"`
  const height = `height="${size}px"`
  const viewBox = `viewBox="0 0 ${size} ${size}"`
  return `<svg ${xmlns} ${width} ${height} ${viewBox}>`
}

import { generateIcon } from './lib/generator'
import { SvgRenderer } from './lib/svg/svgRenderer'
import { SvgWriter } from './lib/svg/svgWriter'
import { Options, parseOptions } from './lib/config'
import { sha1 } from '@onerbs/hashy'

/**
 * Draws an identicon as an SVG string.
 * @param value - A hexadecimal hash string or a string to be hashed
 * @param size - Icon size in pixels
 * @param config - Optional configuration
 */
export function toSvg(value: string, size: number, options?: Options): string {
  const config = parseOptions(options)
  const writer = new SvgWriter(size)
  generateIcon(new SvgRenderer(writer), getValidHash(value), config)
  return writer.toString()
}

/**
 * Draws an identicon as a base64-encoded SVG string.
 * @param value - A hexadecimal hash string or a string to be hashed
 * @param size - Icon size in pixels
 * @param config - Optional configuration
 */
export function base64Svg(value: string, size: number, options?: Options): string {
  const data = btoa(unescape(encodeURIComponent(toSvg(value, size, options))))
  return `data:image/svg+xml;base64,${data}`
}

/**
 * Inputs a value that might be a valid hash string,
 * otherwise the value will be hashed.
 */
function getValidHash(target: string): string {
  return /^[a-f\d]{11,}$/i.test(target) ? target : sha1.hash(target)
}

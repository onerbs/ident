export const RE_COLOR_SHORT = /^#[a-f\d]{3,4}$/i
export const RE_COLOR_LONG = /^#[a-f\d]{6}([a-f\d]{2})?$/i

/**
 * @param color - The color value to parse. (`#rgb[a]` | `#rrggbb[aa]`)
 * @returns The color in the format `#rrggbbaa` or an empty string
 */
export function parseColor(color: string): string {
  let result = ''
  if (RE_COLOR_SHORT.test(color)) {
    if (color.length === 4) {
      const [h, r, g, b] = color
      result = h + r + r + g + g + b + b + 'ff'
    } else {
      const [h, r, g, b, a] = color
      result = h + r + r + g + g + b + b + a + a
    }
  } else if (RE_COLOR_LONG.test(color)) {
    if (color.length === 7) {
      result = color + 'ff'
    }
    if (color.length === 9) {
      result = color
    }
  }
  return result
}

/**
 * Parses a substring of the hash as a number.
 */
export function parseHex(hash: string, startPosition: number, octets?: number) {
  return parseInt(hash.substr(startPosition, octets), 16)
}

/**
 * Converts an HSL color to a hexadecimal RGB color.
 * This function will correct the lightness for the 'dark' hues.
 * @param hue - Hue in range [0.0, 1.0]
 * @param saturation - Saturation in range [0.0, 1.0]
 * @param lightness - Lightness in range [0.0, 1.0]
 */
export function correctedHsl(hue: number, saturation: number, lightness: number): string {
  // The corrector specifies the perceived middle lightness for each hue
  const correctors = [0.55, 0.5, 0.5, 0.46, 0.6, 0.55, 0.55]
  const corrector = correctors[(hue * 6 + 0.5) | 0]

  // Adjust the input lightness relative to the corrector
  lightness = lightness < 0.5 ? lightness * corrector * 2 : corrector + (lightness - 0.5) * (1 - corrector) * 2

  return hsl(hue, saturation, lightness)
}

/**
 * Converts an HSL color to a hexadecimal RGB color.
 * @param hue - Hue in range [0.0, 1.0]
 * @param saturation - Saturation in range [0.0, 1.0]
 * @param lightness - Lightness in range [0.0, 1.0]
 */
export function hsl(hue: number, saturation: number, lightness: number): string {
  // Based on http://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color
  let result: string
  if (saturation == 0) {
    const partialHex = decToHex(lightness * 255)
    result = partialHex + partialHex + partialHex
  }
  else {
    const m2 = lightness <= 0.5 ? lightness * (saturation + 1) : lightness + saturation - lightness * saturation,
      m1 = lightness * 2 - m2
    result =
      hueToRgb(m1, m2, hue * 6 + 2) +
      hueToRgb(m1, m2, hue * 6) +
      hueToRgb(m1, m2, hue * 6 - 2)
  }
  return `#${result}`
}

function decToHex(v: number): string {
  v |= 0 // Ensure integer value
  return v <= 0 ? '00' :
    v < 16 ? '0' + v.toString(16) :
      v < 256 ? v.toString(16) :
        'ff'
}

function hueToRgb(m1: number, m2: number, h: number): string {
  h = h < 0 ? h + 6 : h > 6 ? h - 6 : h
  return decToHex(255 * (
    h < 1 ? m1 + (m2 - m1) * h :
      h < 3 ? m2 :
        h < 4 ? m1 + (m2 - m1) * (4 - h) :
          m1))
}

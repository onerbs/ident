import { parseColor } from "./color"

type Range = [number, number]

export interface Config {
  hues: number[],
  lightness: {
    color: Range,
    grayscale: Range,
  },
  saturation: {
    color: number,
    grayscale: number,
  },
  backColor: string,
  padding: number,
  replaceMode: "never" | "once" | "observe"
}

export interface ParsedConfig {
  backColor: string
  colorSaturation: number
  grayscaleSaturation: number
  iconPadding: number
  colorLightness(value: number): number
  grayscaleLightness(value: number): number
  hue(hue: number): number
}

export function getConfig(options?: Options): ParsedConfig {
  const config = parseOptions(options)
  const { saturation, lightness } = config
  return {
    backColor: parseColor(config.backColor),
    colorSaturation: saturation.color,
    grayscaleSaturation: saturation.grayscale,
    iconPadding: config.padding,
    colorLightness: (value) => getLightness(lightness.color, value),
    grayscaleLightness: (value) => getLightness(lightness.grayscale, value),
    hue: (hue) => getHue(config.hues, hue),
  }
}

const defaultConfig: Config = {
  hues: [],
  lightness: {
    color: [0.4, 0.8],
    grayscale: [0.3, 0.9],
  },
  saturation: {
    color: 0.5,
    grayscale: 0.0,
  },
  backColor: '#0000',
  padding: 0.08,
  replaceMode: "once"
}

export function parseOptions(config?: Options): Config {
  return Object.assign({}, defaultConfig, config || {})
}

/**
 * Creates a lightness range.
 * Gets a lightness relative the specified value in the specified lightness range.
 */
function getLightness(_range: Range, value: number) {
  value = _range[0] + value * (_range[1] - _range[0])
  return value < 0 ? 0 : value > 1 ? 1 : value
}

/**
 * Gets a hue allowed by the configured hue restriction,
 * provided the originally computed hue.
 */
function getHue(hues: number[], hue: number) {
  let _hue = -1
  if (hues && hues.length > 0) {
    // originalHue is in the range [0, 1]
    // Multiply with 0.999 to change the range to [0, 1) and then truncate the index.
    _hue = hues[0 | (0.999 * hue * hues.length)]
  }
  // If A hue was specified, convert it from degrees to turns in the range [0, 1).
  return _hue >= 0 ? ((((_hue / 360) % 1) + 1) % 1) : hue
}

export interface Options {
  hues?: number[],
  lightness?: {
    color?: Range,
    grayscale?: Range,
  },
  saturation?: {
    color?: number,
    grayscale?: number,
  },
  backColor?: string,
  padding?: number,
  replaceMode?: "never" | "once" | "observe"
}

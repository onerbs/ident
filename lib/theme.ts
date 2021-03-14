import { ParsedConfig } from './config'
import { correctedHsl } from './color'

/**
 * Gets a set of ident color candidates for a specified hue and config.
 */
export function getTheme(hue: number, config: ParsedConfig) {
  hue = config.hue(hue)
  return [
    // Dark gray
    correctedHsl(hue, config.grayscaleSaturation, config.grayscaleLightness(0)),
    // Mid color
    correctedHsl(hue, config.colorSaturation, config.colorLightness(0.5)),
    // Light gray
    correctedHsl(hue, config.grayscaleSaturation, config.grayscaleLightness(1)),
    // Light color
    correctedHsl(hue, config.colorSaturation, config.colorLightness(1)),
    // Dark color
    correctedHsl(hue, config.colorSaturation, config.colorLightness(0)),
  ]
}

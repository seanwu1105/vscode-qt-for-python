import type {
  CancellationToken,
  DocumentColorProvider,
  ProviderResult,
  TextDocument,
} from 'vscode'
import {
  Color,
  ColorInformation,
  ColorPresentation,
  languages,
  Range,
} from 'vscode'
import { isNil, notNil } from '../utils'

export function registerQssColorProvider() {
  return languages.registerColorProvider(
    { scheme: 'file', language: 'qss' },
    getDocumentColorProvider(),
  )
}

function getDocumentColorProvider(): DocumentColorProvider {
  return {
    provideDocumentColors: (
      document: TextDocument,
      _token: CancellationToken,
    ): ProviderResult<ColorInformation[]> =>
      matchHexColor(document.getText()).map(match => {
        const start = document.positionAt(match.offsetRange.start)
        const end = document.positionAt(match.offsetRange.end)
        const range = new Range(start, end)
        return new ColorInformation(range, match.color)
      }),

    provideColorPresentations: (
      color: Color,
      _context: { document: TextDocument; range: Range },
      _token: CancellationToken,
    ): ProviderResult<ColorPresentation[]> => {
      const supportedPresentation = [
        new ColorPresentation(`#${fromColorToAarrggbb(color)}`),
      ]

      if (color.alpha === 1)
        supportedPresentation.push(
          new ColorPresentation(`#${fromColorToRgb(color)}`),
          new ColorPresentation(`#${fromColorToRrggbb(color)}`),
        )

      return supportedPresentation
    },
  }
}

export function matchHexColor(text: string): readonly MatchedColor[] {
  /* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-non-null-assertion */

  // According to the spec: https://doc.qt.io/qt-6/qcolor.html#fromString
  // Match #rgb, #rrggbb, #aarrggbb
  const rgbLength = 3
  const rrggbbLength = 6
  const aarrggbbLength = 8

  const regex = new RegExp(
    `#([0-9a-f]{${rgbLength}}|[0-9a-f]{${rrggbbLength}}|[0-9a-f]{${aarrggbbLength}})\\b`,
    'gi',
  )
  const matches = text.matchAll(regex)

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const hex = match[1]
      if (isNil(hex)) return undefined

      if (hex.length === rgbLength)
        return {
          color: fromRgbToColor(hex),
          offsetRange: {
            start: match.index,
            end: match.index + match[0].length,
          },
        }

      if (hex.length === rrggbbLength)
        return {
          color: fromRrggbbToColor(hex),
          offsetRange: {
            start: match.index,
            end: match.index + match[0].length,
          },
        }

      if (hex.length === aarrggbbLength)
        return {
          color: fromAarrggbbToColor(hex),
          offsetRange: {
            start: match.index,
            end: match.index + match[0].length,
          },
        }

      return undefined
    })
    .filter(notNil)
}

export type MatchedColor = {
  readonly color: Color
  readonly offsetRange: {
    readonly start: number // inclusive
    readonly end: number // exclusive
  }
}

export function fromRgbToColor(rgb: string) {
  return new Color(
    parseInt(rgb.slice(0, 1), 16) / 15,
    parseInt(rgb.slice(1, 2), 16) / 15,
    parseInt(rgb.slice(2, 3), 16) / 15,
    1,
  )
}

export function fromColorToRgb(color: Color) {
  return (
    Math.round(color.red * 15).toString(16) +
    Math.round(color.green * 15).toString(16) +
    Math.round(color.blue * 15).toString(16)
  )
}

export function fromRrggbbToColor(rrggbb: string) {
  return new Color(
    parseInt(rrggbb.slice(0, 2), 16) / 255,
    parseInt(rrggbb.slice(2, 4), 16) / 255,
    parseInt(rrggbb.slice(4, 6), 16) / 255,
    1,
  )
}

export function fromColorToRrggbb(color: Color) {
  return (
    Math.round(color.red * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.green * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.blue * 255)
      .toString(16)
      .padStart(2, '0')
  )
}

export function fromAarrggbbToColor(aarrggbb: string) {
  return new Color(
    parseInt(aarrggbb.slice(2, 4), 16) / 255,
    parseInt(aarrggbb.slice(4, 6), 16) / 255,
    parseInt(aarrggbb.slice(6, 8), 16) / 255,
    parseInt(aarrggbb.slice(0, 2), 16) / 255,
  )
}

export function fromColorToAarrggbb(color: Color) {
  return (
    Math.round(color.alpha * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.red * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.green * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.blue * 255)
      .toString(16)
      .padStart(2, '0')
  )
}

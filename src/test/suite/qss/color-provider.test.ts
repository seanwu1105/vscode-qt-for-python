/* eslint-disable @typescript-eslint/no-magic-numbers */

import * as assert from 'node:assert'
import { Color } from 'vscode'
import type { MatchedColor } from '../../../qss/color-provider'
import {
  fromAarrggbbToColor,
  fromColorToAarrggbb,
  fromColorToRgb,
  fromColorToRrggbb,
  fromRgbToColor,
  fromRrggbbToColor,
  matchHexColor,
} from '../../../qss/color-provider'

suite('color-provider', () => {
  suite('matchHexColor', () => {
    test('should match #rgb', () => {
      const text = '#fff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 0, end: 4 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match #rrggbb', () => {
      const text = '#ffffff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 0, end: 7 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match #aarrggbb', () => {
      const text = '#ffffffff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 0, end: 9 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match #rgb with other texts', () => {
      const text = 'color: #fff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 11 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match multiple #rgb patterns with other texts', () => {
      const text = 'color: #fff; background-color: #000'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 11 } },
        { color: new Color(0, 0, 0, 1), offsetRange: { start: 31, end: 35 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match multiple #rrggbb patterns with other texts', () => {
      const text = 'color: #ffffff; background-color: #000000'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 14 } },
        { color: new Color(0, 0, 0, 1), offsetRange: { start: 34, end: 41 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match #aarrggbb with other texts', () => {
      const text = 'color: #ffffffff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 16 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match multiple #aarrggbb patterns with other texts', () => {
      const text = 'color: #ffffffff; background-color: #00000000'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 16 } },
        { color: new Color(0, 0, 0, 0), offsetRange: { start: 36, end: 45 } },
      ]
      assert.deepStrictEqual(match, expected)
    })

    test('should match all patterns with other texts', () => {
      const text =
        'color: #fff; background-color: #ffffff; border-color: #ffffffff'
      const match = matchHexColor(text)
      const expected: readonly MatchedColor[] = [
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 7, end: 11 } },
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 31, end: 38 } },
        { color: new Color(1, 1, 1, 1), offsetRange: { start: 54, end: 63 } },
      ]
      assert.deepStrictEqual(match, expected)
    })
  })

  suite('color converters', () => {
    test('should convert between rgb and color', () => {
      const rgb = 'fff'
      assert.strictEqual(rgb, fromColorToRgb(fromRgbToColor(rgb)))
    })

    test('should convert between rrggbb and color', () => {
      const rrggbb = 'ffffff'
      assert.strictEqual(rrggbb, fromColorToRrggbb(fromRrggbbToColor(rrggbb)))
    })

    test('should convert between aarrggbb and color', () => {
      const aarrggbb = 'ffffffff'
      assert.strictEqual(
        aarrggbb,
        fromColorToAarrggbb(fromAarrggbbToColor(aarrggbb)),
      )
    })
  })
})

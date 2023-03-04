import * as assert from 'node:assert'
import { commands } from 'vscode'
import { EXTENSION_NAMESPACE } from '../../../constants'

suite('compileTranslations', () => {
  test('should include the command', async () =>
    assert.ok(
      (await commands.getCommands(true)).includes(
        `${EXTENSION_NAMESPACE}.compileTranslations`,
      ),
    ))
})

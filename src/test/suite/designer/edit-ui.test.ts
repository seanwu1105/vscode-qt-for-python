import * as assert from 'node:assert'
import { editUi } from '../../../designer/edit-ui'
import { notNil } from '../../../utils'

// Skip E2E test as it shows another GUI window which blocks the test flow.
suite('editUi/e2e', () => assert.ok(notNil(editUi)))

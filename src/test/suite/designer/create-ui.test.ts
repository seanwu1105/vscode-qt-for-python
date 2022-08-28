import * as assert from 'node:assert'
import { createUi } from '../../../designer/create-ui'
import { notNil } from '../../../utils'

// Skip E2E test as it shows another GUI window which blocks the test flow.
suite('createUi/e2e', () => assert.ok(notNil(createUi)))

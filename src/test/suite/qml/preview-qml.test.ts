import * as assert from 'node:assert'
import { previewQml } from '../../../qml/preview-qml'
import { notNil } from '../../../utils'

// Skip E2E test as it shows another GUI window which blocks the test flow.
suite('previewQml/e2e', () => assert.ok(notNil(previewQml)))

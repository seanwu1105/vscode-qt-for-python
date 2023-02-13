import * as assert from 'node:assert'
import type { Subscription } from 'rxjs'
import { ReplaySubject } from 'rxjs'
import * as sinon from 'sinon'
import { LanguageClient } from 'vscode-languageclient/node'
import { stopPreviousClient } from '../../../qmlls/client'
import { waitFor } from '../test-utils'

suite('qmlls/client', () => {
  suite('stopPreviousClient', () => {
    suite('when a new client is created', () => {
      const client$ = new ReplaySubject<LanguageClient>(1)
      const observable$ = client$.pipe(stopPreviousClient())

      const client1 = new LanguageClient(
        'client1',
        { command: 'mock-command' },
        {},
      )
      const client2 = new LanguageClient(
        'client2',
        { command: 'mock-command' },
        {},
      )

      let disposeSpy: sinon.SinonSpy
      let subscription: Subscription

      setup(() => {
        disposeSpy = sinon.spy(client1, 'dispose')
        subscription = observable$.subscribe()
        client$.next(client1)
        client$.next(client2)
      })

      teardown(() => {
        subscription.unsubscribe()
        sinon.restore()
      })

      test('should stop previous client', async () =>
        waitFor(() => assert.ok(disposeSpy.calledOnce)))
    })
  })
})

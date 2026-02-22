import { useState } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { Card, CardHeader, CardBody } from './components/Card';
import { ToastProvider, useToast } from './components/Toast';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './components/Tabs';
import { useWarnOnLeave } from './hooks/useWarnOnLeave';
import { WarnOnLeaveModal } from './components/WarnOnLeaveModal/WarnOnLeaveModal';
// import { WarnLink } from './components/WarnLink/WarnLink';
// import { WarnButton } from './components/WarnButton/WarnButton';
// import { Input } from './components/Input';
import {
  ExternalLinkGuard,
  ExternalLink,
} from './components/ExternalLinkGuard';

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button
        onClick={() =>
          toast({
            title: 'Saved',
            message: 'Changes saved successfully.',
            variant: 'success',
          })
        }
      >
        Success toast
      </Button>

      <Button
        variant='ghost'
        onClick={() =>
          toast({
            title: 'Something failed',
            message: 'Could not save your changes.',
            variant: 'error',
            action: { label: 'Retry', onClick: () => console.log('retry') },
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

function App() {
  const [openModal, setOpenModal] = useState(false);

  const [shouldWarn, setShouldWarn] = useState(true); // <- your app-level condition
  const { open, confirm, cancel } = useWarnOnLeave(shouldWarn); // request,

  return (
    <>
      <ExternalLinkGuard
        title='Leaving OurSite.com'
        confirmText='Continue'
        cancelText='Cancel'
      >
        <header>
          <h1>Component Library</h1>
        </header>
        <main className='main'>
          {/* Buttons */}
          <section>
            <h2>Buttons</h2>
            <div className='container'>
              <Button onClick={() => alert('hey')}>Primary</Button>
              <span style={{ marginLeft: 12 }} />
              <Button variant='ghost'>Ghost</Button>
            </div>
          </section>

          {/* Modal */}
          <section>
            <h2>Modal</h2>
            <div className='container'>
              <Button onClick={() => setOpenModal(true)}>Open modal</Button>
              <Modal
                open={openModal}
                title='Confirm'
                onClose={() => setOpenModal(false)}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, vel fugiat? Dolorum consequuntur sint vel
                dignissimos. Earum blanditiis corporis aspernatur, velit
                suscipit odio tempore ratione sunt quis magni obcaecati aliquid
                impedit amet aut porro at molestiae excepturi veniam dolor
                perferendis doloremque culpa. Porro magnam ullam hic odio minima
                tempora iure?
              </Modal>
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2>Cards</h2>
            <div className='container card-row'>
              <Card padded={false}>
                <CardHeader title='Profile' description='Public info' />
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quidem porro perspiciatis modi architecto delectus
                  voluptate, consequatur quod ex quam unde culpa quia quisquam
                  provident.
                </CardBody>
              </Card>
              <Card padded={false}>
                <CardHeader title='Profile' description='Public info' />
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quidem porro perspiciatis modi architecto delectus
                  voluptate, consequatur quod ex quam unde culpa quia quisquam
                  provident.
                </CardBody>
              </Card>
              <Card padded={false}>
                <CardHeader title='Profile' description='Public info' />
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quidem porro perspiciatis modi architecto delectus
                  voluptate, consequatur quod ex quam unde culpa quia quisquam
                  provident.
                </CardBody>
              </Card>
              <Card padded={false}>
                <CardHeader title='Profile' description='Public info' />
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quidem porro perspiciatis modi architecto delectus
                  voluptate, consequatur quod ex quam unde culpa quia quisquam
                  provident.
                </CardBody>
              </Card>
              <Card padded={false}>
                <CardHeader title='Profile' description='Public info' />
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quidem porro perspiciatis modi architecto delectus
                  voluptate, consequatur quod ex quam unde culpa quia quisquam
                  provident.
                </CardBody>
              </Card>
            </div>
          </section>

          {/* Toast */}
          <section>
            <h2>Toast</h2>
            <div className='container'>
              <ToastProvider>
                <div style={{ padding: 24, display: 'grid', gap: 16 }}>
                  <ToastDemo />
                </div>
              </ToastProvider>
            </div>
          </section>

          {/* Tabs */}
          <section>
            <h2>Tabs</h2>
            <div className='container'>
              <Tabs defaultValue='one'>
                <TabsList>
                  <TabsTrigger value='one'>One</TabsTrigger>
                  <TabsTrigger value='two'>Two</TabsTrigger>
                  <TabsTrigger value='three'>Three</TabsTrigger>
                </TabsList>

                <TabsContent value='one'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  facilis illo sit doloribus magnam, tempore dolore consequuntur
                  voluptates ducimus animi.
                </TabsContent>
                <TabsContent value='two'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                  officia quibusdam atque numquam necessitatibus maiores qui
                  itaque repellendus illum illo?
                </TabsContent>
                <TabsContent value='three'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima ipsum velit illum repudiandae provident id eaque quos
                  incidunt adipisci blanditiis.
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section>
            <div className='container'>
              {/* Toggle just to demo */}
              {/* <label>
                <input
                  type='checkbox'
                  checked={shouldWarn}
                  onChange={(e) => setShouldWarn(e.target.checked)}
                />
                Warn on leave
              </label>
              <span style={{ marginLeft: 12 }} />
              <nav>
                {/* <WarnLink
                shouldWarn={shouldWarn}
                requestLeave={request}
                href='https://linktr.ee/antiherophotos'
                target='_blank'
                className='btn'
              >
                Go somewhere
              </WarnLink> */}
              {/* <WarnLink
                shouldWarn={shouldWarn}
                requestLeave={request}
                href='https://linktr.ee/antiherophotos'
                variant='link'
              >
                Go to docs
              </WarnLink> */}

              {/* <WarnLink
                  shouldWarn={shouldWarn}
                  requestLeave={request}
                  href='https://linktr.ee/antiherophotos'
                  target='_blank'
                  variant='button'
                >
                  Leave page
                </WarnLink>
              </nav> */}

              {/* <WarnButton
              shouldWarn={shouldWarn}
              requestLeave={request}
              type='button'
              onClick={() => {
                // any “leave” action: close panel, reset state, etc.
                console.log('Leaving / discarding / navigating');
              }}
            >
              Discard changes
            </WarnButton> */}
              <ExternalLink
                href='https://linktr.ee/antiherophotos'
                target='_blank'
              >
                Visit Linktree
              </ExternalLink>
              <span style={{ marginLeft: 12 }} />
              <ExternalLink
                href='https://linktr.ee/antiherophotos'
                target='_blank'
                variant='button'
              >
                Button Style Link
              </ExternalLink>

              <WarnOnLeaveModal
                open={open}
                onConfirm={confirm}
                onCancel={cancel}
              />
            </div>
          </section>
        </main>
      </ExternalLinkGuard>
    </>
  );
}

export default App;

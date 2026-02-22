import { useState } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { Card, CardHeader, CardBody } from './components/Card';
import { ToastProvider, useToast } from './components/Toast';
// import { Input } from './components/Input';

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
  const [open, setOpen] = useState(false);
  return (
    <>
      <header>
        <h1>Component Library</h1>
      </header>
      <main className='main'>
        <section>
          <h2>Buttons</h2>
          <div className='container'>
            <Button onClick={() => alert('hey')}>Primary</Button>
            <span style={{ marginLeft: 12 }} />
            <Button variant='ghost'>Ghost</Button>
          </div>
        </section>

        <section>
          <h2>Modal</h2>
          <div className='container'>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal open={open} title='Confirm' onClose={() => setOpen(false)}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, vel fugiat? Dolorum consequuntur sint vel
              dignissimos. Earum blanditiis corporis aspernatur, velit suscipit
              odio tempore ratione sunt quis magni obcaecati aliquid impedit
              amet aut porro at molestiae excepturi veniam dolor perferendis
              doloremque culpa. Porro magnam ullam hic odio minima tempora iure?
            </Modal>
          </div>
        </section>

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
        <section>
          <div className='container'>
            <ToastProvider>
              <div style={{ padding: 24, display: 'grid', gap: 16 }}>
                {/* <Tabs defaultValue='one'>
                  <TabsList>
                    <TabsTrigger value='one'>One</TabsTrigger>
                    <TabsTrigger value='two'>Two</TabsTrigger>
                    <TabsTrigger value='three'>Three</TabsTrigger>
                  </TabsList>

                  <TabsContent value='one'>Tab one content</TabsContent>
                  <TabsContent value='two'>Tab two content</TabsContent>
                  <TabsContent value='three'>Tab three content</TabsContent>
                </Tabs> */}

                <ToastDemo />
              </div>
            </ToastProvider>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

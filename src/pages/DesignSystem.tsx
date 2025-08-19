import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Input, Tooltip, Modal } from '../components/ui/design-system';
import { ThemeSwitcher } from '../components/ui/theme';

const DesignSystem: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-h3 font-bold gradient-text">MindCanvas Design System</h1>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Color Tokens */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Color Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Background', className: 'bg-background border border-border' },
              { name: 'Surface', className: 'bg-surface' },
              { name: 'Card', className: 'bg-card' },
              { name: 'Primary', className: 'bg-primary text-white' },
              { name: 'Secondary', className: 'bg-secondary text-white' },
              { name: 'Success', className: 'bg-success text-white' },
              { name: 'Warning', className: 'bg-warning text-white' },
              { name: 'Error', className: 'bg-error text-white' },
              { name: 'Text', className: 'bg-text text-white' },
              { name: 'Muted', className: 'bg-muted text-white' },
              { name: 'Border', className: 'bg-border' },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`h-16 rounded-md shadow-sm ${color.className}`}></div>
                <p className="text-sm font-medium">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Elevation (Shadows) */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Elevation (Shadows)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'shadow-xs', shadow: 'shadow-xs' },
              { name: 'shadow-sm', shadow: 'shadow-sm' },
              { name: 'shadow-md', shadow: 'shadow-md' },
              { name: 'shadow-lg', shadow: 'shadow-lg' },
              { name: 'shadow-xl', shadow: 'shadow-xl' },
            ].map((shadow) => (
              <div key={shadow.name} className="space-y-2">
                <div className={`h-16 bg-card rounded-md ${shadow.shadow}`}></div>
                <p className="text-sm font-medium">{shadow.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Border Radius</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'radius-xs', radius: 'rounded-xs' },
              { name: 'radius-sm', radius: 'rounded-sm' },
              { name: 'radius-md', radius: 'rounded-md' },
              { name: 'radius-lg', radius: 'rounded-lg' },
              { name: 'radius-2xl', radius: 'rounded-2xl' },
            ].map((radius) => (
              <div key={radius.name} className="space-y-2">
                <div className={`h-16 bg-card ${radius.radius} shadow-md`}></div>
                <p className="text-sm font-medium">{radius.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Spacing Scale</h2>
          <div className="flex flex-col space-y-4">
            {[
              { name: 'space-2 (2px)', size: 'w-2' },
              { name: 'space-4 (4px)', size: 'w-4' },
              { name: 'space-6 (6px)', size: 'w-6' },
              { name: 'space-8 (8px)', size: 'w-8' },
              { name: 'space-12 (12px)', size: 'w-12' },
              { name: 'space-16 (16px)', size: 'w-16' },
              { name: 'space-24 (24px)', size: 'w-24' },
              { name: 'space-32 (32px)', size: 'w-32' },
            ].map((space) => (
              <div key={space.name} className="flex items-center">
                <div className={`${space.size} h-8 bg-primary rounded-sm`}></div>
                <p className="ml-4 text-sm font-medium">{space.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Typography</h2>
          <div className="space-y-6 bg-surface p-6 rounded-lg shadow-md">
            <div>
              <h1 className="text-display font-bold">Display</h1>
              <p className="text-sm text-muted">font-size: var(--font-display), line-height: var(--line-height-display)</p>
            </div>
            <div>
              <h1 className="text-h1 font-bold">Heading 1</h1>
              <p className="text-sm text-muted">font-size: var(--font-h1), line-height: var(--line-height-h1)</p>
            </div>
            <div>
              <h2 className="text-h2 font-bold">Heading 2</h2>
              <p className="text-sm text-muted">font-size: var(--font-h2), line-height: var(--line-height-h2)</p>
            </div>
            <div>
              <h3 className="text-h3 font-bold">Heading 3</h3>
              <p className="text-sm text-muted">font-size: var(--font-h3), line-height: var(--line-height-h3)</p>
            </div>
            <div>
              <h4 className="text-h4 font-bold">Heading 4</h4>
              <p className="text-sm text-muted">font-size: var(--font-h4), line-height: var(--line-height-h4)</p>
            </div>
            <div>
              <h5 className="text-h5 font-bold">Heading 5</h5>
              <p className="text-sm text-muted">font-size: var(--font-h5), line-height: var(--line-height-h5)</p>
            </div>
            <div>
              <h6 className="text-h6 font-bold">Heading 6</h6>
              <p className="text-sm text-muted">font-size: var(--font-h6), line-height: var(--line-height-h6)</p>
            </div>
            <div>
              <p className="text-body">Body text. This is what regular text looks like. It uses the font-size: var(--font-body) and line-height: var(--line-height-body).</p>
            </div>
            <div>
              <p className="text-caption text-muted">Caption text. Used for secondary information. Uses font-size: var(--font-caption) and line-height: var(--line-height-caption).</p>
            </div>
          </div>
        </section>

        {/* Motion */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Motion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-h6 font-semibold mb-4">Duration & Easing</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Duration 100ms (--duration-100)</p>
                  <div className="relative h-8 bg-surface rounded-md overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-12 bg-primary rounded-md"
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Duration 300ms (--duration-300)</p>
                  <div className="relative h-8 bg-surface rounded-md overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-12 bg-secondary rounded-md"
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Easing Enter (--easing-enter)</p>
                  <div className="relative h-8 bg-surface rounded-md overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-12 bg-success rounded-md"
                      animate={{ x: [0, 100, 0] }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0, 0, 0.2, 1.15], 
                        repeat: Infinity, 
                        repeatDelay: 1 
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-h6 font-semibold mb-4">Animation Examples</h3>
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-sm font-medium">Hover Animation</p>
                  <motion.div
                    className="h-16 bg-primary rounded-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Bounce Animation</p>
                  <motion.div
                    className="h-16 w-16 bg-secondary rounded-md mx-auto"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Component Examples */}
        <section className="space-y-6">
          <h2 className="text-h4 font-semibold">Component Examples</h2>
          
          {/* Buttons */}
          <Card className="p-6 space-y-6">
            <h3 className="text-h6 font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" size="lg">Large Button</Button>
            </div>
          </Card>
          
          {/* Inputs */}
          <Card className="p-6 space-y-6">
            <h3 className="text-h6 font-semibold">Inputs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Default Input" placeholder="Type something..." />
              <Input label="Disabled Input" placeholder="Can't type here" disabled />
              <Input label="With Error" placeholder="Type something..." error="This field is required" />
            </div>
          </Card>
          
          {/* Tooltips */}
          <Card className="p-6 space-y-6">
            <h3 className="text-h6 font-semibold">Tooltips</h3>
            <div className="flex flex-wrap gap-8 justify-center">
              <Tooltip content="Top tooltip" position="top">
                <Button variant="outline" size="sm">Hover me (Top)</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" position="right">
                <Button variant="outline" size="sm">Hover me (Right)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="outline" size="sm">Hover me (Bottom)</Button>
              </Tooltip>
              <Tooltip content="Left tooltip with more text content" position="left">
                <Button variant="outline" size="sm">Hover me (Left)</Button>
              </Tooltip>
            </div>
          </Card>
          
          {/* Modal */}
          <Card className="p-6 space-y-6">
            <h3 className="text-h6 font-semibold">Modal</h3>
            <div>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
              >
                <div className="space-y-4">
                  <p>This is an example modal with a standardized design that follows our design system.</p>
                  <Input label="Sample Input" placeholder="Type something..." />
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                  </div>
                </div>
              </Modal>
            </div>
          </Card>
          
          {/* Card Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-h5 font-semibold mb-3">Standard Card</h3>
              <p className="text-muted">This is a standard card component with default shadow.</p>
            </Card>
            
            <Card elevated>
              <h3 className="text-h5 font-semibold mb-3">Elevated Card</h3>
              <p className="text-muted">This card has increased elevation with a larger shadow.</p>
            </Card>
            
            <div className="glass-panel p-6">
              <h3 className="text-h5 font-semibold mb-3">Glass Panel</h3>
              <p className="text-muted">A glass morphism style panel with blur effect.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;

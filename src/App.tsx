import { AccordionGroup } from './components/ui/accordion-group/AccordionGroup.tsx';
import { Input } from './components/ui/input/Input.tsx';
import './index.css';

const items = [
    {
        title: 'Blue Sky',
        content: 'A refreshing view of a clear blue sky with scattered clouds.',
    },
    {
        title: 'Sunny Day',
        content: 'A bright and cheerful day filled with sunshine and warmth.',
    },
    {
        title: 'Mountain Peak',
        content: 'A breathtaking panorama from the top of a rugged mountain.',
    },
    {
        title: 'Ocean Breeze',
        content: 'The soothing sound of waves and a cool ocean breeze on a summer day.',
    },
    {
        title: 'Forest Walk',
        content: 'A peaceful walk through a lush green forest with rustling leaves.',
    },
];

function App() {
    return (
        <>
            <div>
                <AccordionGroup items={items} />
                <Input type="text" label="test label" placeholder="test placeholder" />
            </div>
        </>
    );
}

export default App;

import styles from './AccordionGroup.module.scss';
import { AccordionItem, Accordion } from '../accordion/Accordion.tsx';

export interface AccordionProps {
    items: AccordionItem[];
}

export const AccordionGroup = ({ items }: AccordionProps) => {
    return (
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <AccordionGroup.Child key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

AccordionGroup.Child = Accordion;

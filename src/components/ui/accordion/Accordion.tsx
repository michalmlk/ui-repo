import styles from './Accordion.module.scss';
import { useRef } from 'react';

export interface AccordionItem {
    title: string;
    content: string;
}

export interface AccordionProps {
    items: AccordionItem[];
}

const DetailsComponent = (props: AccordionItem) => {
    const contentRef = useRef<HTMLParagraphElement>(null);

    const handleToggle = (e: any) => {
        if (e.currentTarget.open) {
            setTimeout(() => {
                contentRef.current?.focus();
            }, 10);
        }
    };
    return (
        <details className={styles.details} onToggle={handleToggle}>
            <summary>{props.title}</summary>
            <p className={styles.content} ref={contentRef} tabIndex={-1}>
                {props.content}
            </p>
        </details>
    );
};

export const Accordion = ({ items }: AccordionProps) => {
    return (
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <Accordion.Child key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

Accordion.Child = DetailsComponent;

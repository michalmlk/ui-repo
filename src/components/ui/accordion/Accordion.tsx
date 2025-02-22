import { useRef, ReactNode } from 'react';
import styles from '../accordion/Accordion.module.scss';

export interface AccordionItem {
    title: string;
    content: ReactNode;
}

export const Accordion = (props: AccordionItem) => {
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
            <p className={styles.content} ref={contentRef} tabIndex={2}>
                {props.content}
            </p>
        </details>
    );
};

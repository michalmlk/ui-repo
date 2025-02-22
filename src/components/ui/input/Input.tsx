import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
};

export const Input = (props: InputProps) => {
    return (
        <div className={styles.outerWrapper}>
            {props.label && (
                <label className={styles.label} htmlFor="input">
                    {props.label}
                </label>
            )}
            <input id="input" className={styles.wrapper} {...props} />
        </div>
    );
};

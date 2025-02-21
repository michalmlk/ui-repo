import styles from './styles/Button.module.scss';
import buttonAnimatedBorderStyles from './styles/ButtonAnimatedBorder.module.scss';
import buttonCircleStyles from './styles/ButtonCircle.module.scss';
import buttonRectangleStyles from './styles/ButtonRectangle.module.scss';
import { ReactNode, useState } from 'react';

interface ButtonProps {
    onClick: () => void;
    label?: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large';
    animationType?: ButtonAnimationType;
}

export type ButtonAnimationType = 'circle' | 'rectangle' | 'border';

export type ButtonBaseProps = ButtonProps &
    (
        | { animationType: 'circle' }
        | {
              animationType: 'rectangle';
              vertical: boolean;
          }
        | { animationType: 'border' }
        | { animationType: 'none' }
    );

type AdditionalStylesKeys = 'animationOrientation' | 'size' | ButtonAnimationType | 'default';

const getButtonSpecificClassName = (props: ButtonBaseProps) => {
    const additionalStyles = new Map<AdditionalStylesKeys, string>();
    additionalStyles.set('size', styles[props.size ?? 'medium']);
    additionalStyles.set('default', styles.button);

    switch (props.animationType) {
        case 'circle':
            additionalStyles.set('circle', buttonCircleStyles.buttonCircle);
            break;
        case 'rectangle': {
            if (props.vertical) {
                additionalStyles.set('animationOrientation', buttonRectangleStyles.vertical);
            } else {
                additionalStyles.set('animationOrientation', buttonRectangleStyles.horizontal);
            }
            additionalStyles.set('rectangle', buttonRectangleStyles.buttonRectangle);
            break;
        }
        case 'border':
            additionalStyles.delete('default');
            additionalStyles.set('border', buttonAnimatedBorderStyles.buttonAnimatedBorder);
            break;
        default:
            break;
    }
    return Array.from(additionalStyles.values()).join(' ');
};

export const Button = (props: ButtonBaseProps) => {
    return (
        <button className={getButtonSpecificClassName(props)} onClick={props.onClick}>
            <span className={styles.label}>{props.label}</span>
        </button>
    );
};

type LoadingState = 'standby' | 'loading' | 'finished';

export const LoadingButton = (props: Omit<ButtonBaseProps, 'label'>) => {
    const [progressState, setProgressState] = useState<LoadingState>('standby');
    const states: LoadingState[] = ['standby', 'loading', 'finished'];

    const handleDelayedClick = () => {
        setProgressState('loading');
        setTimeout(() => {
            setProgressState('finished');
        }, 1500);
        setTimeout(() => {
            props.onClick();
            setProgressState('standby');
        }, 2000);
    };

    const getProgressClassNameByState = (state: LoadingState) => {
        return state === progressState
            ? styles.current
            : states.indexOf(progressState) > states.indexOf(state)
              ? styles.previous
              : styles.next;
    };

    return (
        <button
            className={`${styles.button} ${styles.statefulBtn} ${styles[progressState]}`}
            onClick={handleDelayedClick}
        >
            <span className={`${styles.labelStandby} ${getProgressClassNameByState('standby')}`}>
                Click me!
            </span>
            <span className={`${styles.labelLoading} ${getProgressClassNameByState('loading')}`}>
                Loading...
            </span>
            <span className={`${styles.labelFinished} ${getProgressClassNameByState('finished')}`}>
                Finished
            </span>
        </button>
    );
};

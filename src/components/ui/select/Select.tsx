import {
    Button,
    Label,
    ListBox,
    ListBoxItem,
    Popover,
    Select,
    SelectValue,
} from 'react-aria-components';
import './SelectStyles.css';

export interface Item {
    id: string;
    value: string;
    label: string;
}

interface SelectProps<T extends Item = Item> {
    label: string;
    placeholder: string;
    items: T[];
}

export const SelectComponent = (props: SelectProps) => {
    const { label, items } = props;

    return (
        <Select>
            <Label>{label}</Label>
            <Button>
                <SelectValue />
                <span aria-hidden="true">▼</span>
            </Button>
            <Popover>
                <ListBox>
                    {items.length
                        ? items.map((item) => <ListBoxItem key={item.id}>{item.label}</ListBoxItem>)
                        : null}
                </ListBox>
            </Popover>
        </Select>
    );
};

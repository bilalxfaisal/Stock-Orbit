import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FilterOption<T extends string | number> {
    id: T;
    label: string;
}

interface FilterSelectProps<T extends string | number> {
    value: T | undefined;

    onValueChange: (
        value: T | undefined,
    ) => void;

    options: FilterOption<T>[];

    allLabel: string;

    disabled?: boolean;

    showAllOption?: boolean;
}

const ALL_VALUE = "all";

export default function FilterSelect<
    T extends string | number
>({
    value,
    onValueChange,
    options,
    allLabel,
    disabled = false,
    showAllOption = true,
}: FilterSelectProps<T>) {

    const selectedLabel =
        value === undefined
            ? allLabel
            : options.find(
                (option) =>
                    String(option.id) === String(value),
            )?.label ?? allLabel;

    return (
        <Select
            value={
                value === undefined
                    ? ALL_VALUE
                    : String(value)
            }
            onValueChange={(selectedValue) => {

                if (
                    selectedValue === ALL_VALUE ||
                    selectedValue === "" ||
                    selectedValue === undefined
                ) {
                    onValueChange(undefined);
                    return;
                }

                const selectedOption = options.find(
                    (option) =>
                        String(option.id) === selectedValue,
                );

                onValueChange(
                    selectedOption?.id,
                );
            }}
            disabled={disabled}
        >
            <SelectTrigger>
                <SelectValue>
                    {selectedLabel}
                </SelectValue>
            </SelectTrigger>

            <SelectContent>

                {showAllOption && (
                    <SelectItem value={ALL_VALUE}>
                        {allLabel}
                    </SelectItem>
                )}

                {options.map((option) => (

                    <SelectItem
                        key={String(option.id)}
                        value={String(option.id)}
                    >
                        {option.label}
                    </SelectItem>

                ))}

            </SelectContent>
        </Select>
    );
}
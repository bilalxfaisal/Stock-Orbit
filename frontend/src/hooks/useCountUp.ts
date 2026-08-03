import { useEffect, useRef, useState } from "react";

// Animates a number from 0 up to `value` over `duration` ms using an
// ease-out curve. Re-triggers whenever `value` changes.
export function useCountUp(value: number, duration = 900) {
    const [display, setDisplay] = useState(0);
    const frame = useRef<number | null>(null);

    useEffect(() => {
        const start = performance.now();
        const from = 0;

        function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);

            // ease-out-cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            setDisplay(Math.round(from + (value - from) * eased));

            if (progress < 1) {
                frame.current = requestAnimationFrame(tick);
            }
        }

        frame.current = requestAnimationFrame(tick);

        return () => {
            if (frame.current) cancelAnimationFrame(frame.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return display;
}
import { React, useState } from "react";

const useSizeStepper = (maxSize, minSize) => {
    const [size, setSize] = useState(0);

    const stepUp = () => {
        if (maxSize <= size) {
            return;
        }
        setSize(size + 1);
    }

    const stepDown = () => {
        if (minSize >= size) {
            return;
        }
        setSize(size - 1);
    }

    return [size, stepUp, stepDown];
}

export default useSizeStepper;
import { useState } from 'react';

export const useCard = () => {
    const [text, setText] = useState(false);

    return {
        text, setText
    };
};

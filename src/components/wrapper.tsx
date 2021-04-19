import React from 'react';
import {Box} from "@chakra-ui/react";
import {WrapperVariant} from "../types";

interface WrapperProps {
    variant?: WrapperVariant
}

const Wrapper: React.FC<WrapperProps> = ({children, variant = 'medium'}) => {
    let width = '800px';
    switch (variant) {
        case 'small':
            width = '400px';
            break
        case 'medium':
            width = '800px';
            break
        case 'large':
            width = '1200px';
            break

    }

    return (
        <Box maxW={width} w="100%" mt={8} mx="auto">
            {children}
        </Box>
    );
}

export default Wrapper;

import React from 'react';
import NavBar from "./navBar";
import Wrapper from "./wrapper";
import {WrapperVariant} from "../types";

interface LayoutProps {
    variant?: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({children, variant}) => {
    return (
        <>
            <NavBar/>
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        </>

    );
}

export default Layout;

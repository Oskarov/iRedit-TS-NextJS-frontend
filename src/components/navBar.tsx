import React from 'react';
import {Flex, Link, Box} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery();
    let body = null;
    if (fetching) {

    } else if (!data?.me) {
        body = <>
            <NextLink href="/login">
                <Link mr={4} color='white'>Login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link mr={4} color='white'>Register</Link>
            </NextLink>
        </>
    } else {
        body = (
            <Box>
                {data.me.username}
            </Box>
        );
    }
return (
    <Flex bg='tomato' p={4}>
        <Box ml={'auto'}>
            {body}
        </Box>
    </Flex>
);
}

export default NavBar;

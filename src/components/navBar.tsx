import React from 'react';
import {Flex, Link, Box, Button} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery();
    let body = null;
    console.log(body);
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
            <Flex>
                <Box mr="4">{data.me.username}</Box>
                <Button variant="link">logout</Button>
            </Flex>
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

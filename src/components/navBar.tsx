import React from 'react';
import {Flex, Link, Box, Button} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import {isServer} from "../util/isServer";

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
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
            <Flex>
                <Box mr="4">{data.me.username}</Box>
                <Button variant="link" onClick={()=>{logout();}} isLoading={logoutFetching}>logout</Button>
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

import NavBar from "../components/navBar";
import {withUrqlClient} from 'next-urql';
import {CreateUrqlClient} from "../util/createUrqlClient";
import {use} from "ast-types";
import {usePostsQuery} from "../generated/graphql";
import Layout from "../components/Layout";
import {Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {Box, Heading, Text, Button} from "@chakra-ui/react";
import {useState} from "react";

const Index = () => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const [{data}] = usePostsQuery({
        variables: {
            limit: variables.limit,
            cursor: variables.cursor
        }
    });

    return <Layout>
        <Link mb={10}>
            <NextLink href="/create-post">
                create post
            </NextLink>
        </Link>
        {!data!.posts ? <div>loading</div> : <> {data!.posts.posts.map((p: any) => {
            return <Box p={5} mb={5} shadow="md" borderWidth="1px" key={p.id}>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
            </Box>
        })}
            <Button onClick={() => {
                setVariables({
                    limit: variables.limit,
                    cursor: data!.posts.posts[data!.posts.posts.length -1].createdAt,
                });
                console.log(variables);
            }} m="auto" mb={2}>Load more</Button>
        </>
        }
    </Layout>
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(Index);

import NavBar from "../components/navBar";
import {withUrqlClient} from 'next-urql';
import {CreateUrqlClient} from "../util/createUrqlClient";
import {use} from "ast-types";
import {usePostsQuery} from "../generated/graphql";
import Layout from "../components/Layout";
import {Link} from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
    const [{data}] = usePostsQuery();

    return <Layout>
        <Link>
            <NextLink href="/create-post">
                create post
            </NextLink>
        </Link>
        <div>hello world</div>
        {!data ? <div>loading</div> : data.posts.map((p: any) => (<div>{p.title}</div>))}
    </Layout>
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(Index);

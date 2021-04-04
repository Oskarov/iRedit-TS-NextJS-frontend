import NavBar from "../components/navBar";
import {withUrqlClient} from 'next-urql';
import {CreateUrqlClient} from "../util/createUrqlClient";
import {use} from "ast-types";
import {usePostsQuery} from "../generated/graphql";

const Index = () => {
    const [{data}] = usePostsQuery();

    return <>
        <NavBar/>
        <div>hello world</div>
        {!data ? <div>loading</div> : data.posts.map((p: any) => (<div>{p.title}</div>))}
    </>
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: false}
)(Index);

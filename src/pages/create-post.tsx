import React from 'react';
import Wrapper from "../components/wrapper";
import {Form, Formik} from "formik";
import {Box, Button, Link} from "@chakra-ui/react";
import InputField from "../components/inputField";
import {useRouter} from "next/router";
import {useCreatePostMutation} from "../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateUrqlClient} from "../util/createUrqlClient";
import Layout from "../components/Layout";
import {toErrorMap} from "../util/toErrorMap";

interface CreatePostProps {

}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
    const router = useRouter();
    const [, createPost] = useCreatePostMutation();
    return (<Layout variant="small">
        <Formik
            initialValues={{title: "", text: ""}}
            onSubmit={async (values) => {
                const {error} = await createPost(values);
                if (error) {
                    console.log(error);
                }
                await router.push("/");
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <Box><InputField name="title" label="enter title" placeholder="title of the post"/></Box>
                    <Box mt={4}><InputField name="text" textarea label="enter text" placeholder="text of the post" type="textarea"/></Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">save post</Button></Box>
                </Form>
            )}
        </Formik>
    </Layout>);
}


export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(CreatePost);

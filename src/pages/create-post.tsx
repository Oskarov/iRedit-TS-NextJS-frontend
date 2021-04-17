import React from 'react';
import Wrapper from "../components/wrapper";
import {Form, Formik} from "formik";
import {Box, Button, Link} from "@chakra-ui/react";
import InputField from "../components/inputField";

interface CreatePostProps {

}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
    return (<Wrapper variant="small">
        <Formik
            initialValues={{title: "", text: ""}}
            onSubmit={async (values) => {
                console.log(values);
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
    </Wrapper>);
}

export default CreatePost;

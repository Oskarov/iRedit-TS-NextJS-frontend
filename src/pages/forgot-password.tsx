import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box, Button, Link} from "@chakra-ui/react";
import {useForgotPasswordMutation, useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../util/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {CreateUrqlClient} from "../util/createUrqlClient";
import NextLink from "next/link";


const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (<Wrapper variant="small">
        <Formik
            initialValues={{email: ""}}
            onSubmit={async (values) => {
                await forgotPassword(values);
                setComplete(true);
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                complete ?
                    <Box>
                        If the account with that email exists, we will sent mail on it
                    </Box>
                    :
                    <Form>
                        <Box><InputField name="email" label="Email" placeholder="email for restoring password" type="email"/></Box>
                        <Box mt={4}><Button isLoading={isSubmitting} type="submit">Send me a link</Button></Box>
                    </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(ForgotPassword);

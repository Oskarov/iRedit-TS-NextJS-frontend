import React from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box, Button, Link} from "@chakra-ui/react";
import {useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../util/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {CreateUrqlClient} from "../util/createUrqlClient";
import NextLink from "next/link";


const Login: React.FC<{}> = ({}) => {
    const [,login] = useLoginMutation()
    const router = useRouter();
    return (<Wrapper variant="small">
        <Formik
            initialValues={{usernameOrEmail: "", password: ""}}
            onSubmit={async (values,{setErrors}) => {
                const response = await login(values);
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user){
                    await router.push('/');
                }
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <Box><InputField name="usernameOrEmail" label="enter unique name" placeholder="username or email"/></Box>
                    <Box mt={4}><InputField name="password" label="enter password" placeholder="password" type="password"/></Box>
                    <Box color='green' mt={4}>
                        <NextLink href="/forgot-password">
                            <Link>Forgot password?</Link>
                        </NextLink>
                    </Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">login</Button></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(Login);

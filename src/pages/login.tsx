import React from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box, Button} from "@chakra-ui/react";
import {useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../util/toErrorMap";
import {useRouter} from "next/router";


const Login: React.FC<{}> = ({}) => {
    const [,login] = useLoginMutation()
    const router = useRouter();
    return (<Wrapper variant="small">
        <Formik
            initialValues={{username: "", password: ""}}
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
                    <Box><InputField name="username" label="enter unique name" placeholder="username"/></Box>
                    <Box mt={4}><InputField name="password" label="enter password" placeholder="password" type="password"/></Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">login</Button></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default Login;

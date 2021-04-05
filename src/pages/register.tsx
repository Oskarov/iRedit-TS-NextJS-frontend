import React from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box, Button} from "@chakra-ui/react";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../util/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {CreateUrqlClient} from "../util/createUrqlClient";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useRegisterMutation();
    const router = useRouter();
    return (<Wrapper variant="small">
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={async (values,{setErrors}) => {
                const response = await register(values);
                if (response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.user){
                    await router.push('/');
                }
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <Box><InputField name="username" label="enter unique name" placeholder="username"/></Box>
                    <Box mt={4}><InputField name="password" label="enter password" placeholder="password" type="password"/></Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">register</Button></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default withUrqlClient(
    CreateUrqlClient,
    {ssr: true}
)(Register);

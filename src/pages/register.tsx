import React from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box} from "@chakra-ui/react";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (<Wrapper variant="small">
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({values, handleChange}) => (
                <Form>
                    <Box><InputField name="username" label="enter unique name" placeholder="username"/></Box>
                    <Box mt={4}><InputField name="password" label="enter password" placeholder="password" type="password"/></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default Register;

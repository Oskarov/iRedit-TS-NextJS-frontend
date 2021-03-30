import React from 'react';
import {Formik, Form} from 'formik';
import Wrapper from "../components/wrapper";
import InputField from "../components/inputField";
import {Box, Button} from "@chakra-ui/react";
import {useMutation} from "urql";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useMutation(REGISTER_MUTATION);
    return (<Wrapper variant="small">
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={values => {
                console.log(values);
                register(values);
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

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!){
  register(options: {username: $username, password: $password}){
    errors {
      field
      message
    }
    user{
      id
      username
    }
  }
}`

export default Register;

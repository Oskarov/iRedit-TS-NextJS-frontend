import {NextPage} from "next";
import Wrapper from "../../components/wrapper";
import {Form, Formik} from "formik";
import {toErrorMap} from "../../util/toErrorMap";
import {Box, Button} from "@chakra-ui/react";
import InputField from "../../components/inputField";
import React from "react";
import {useRouter} from "next/router";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    return (<Wrapper variant="small">
        <Formik
            initialValues={{newPassword: "", newPasswordConfirmed: ""}}
            onSubmit={async (values,{setErrors}) => {
                const response = await login(values);
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user){
                    await router.push('/login');
                }
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <Box><InputField name="newPassword" label="enter new password" placeholder="new password" type="password"/></Box>
                    <Box mt={4}><InputField name="newPasswordConfirmed" label="enter new password again" placeholder="new password again" type="password"/></Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">login</Button></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);;
}

ChangePassword.getInitialProps = ({query}) =>{
    return {
        token: query.token as string
    }
}

export default ChangePassword;
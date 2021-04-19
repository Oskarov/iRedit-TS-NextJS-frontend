import {NextPage} from "next";
import Wrapper from "../../components/wrapper";
import {Form, Formik} from "formik";
import {toErrorMap} from "../../util/toErrorMap";
import {Box, Button, Link} from "@chakra-ui/react";
import InputField from "../../components/inputField";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useChangePasswordMutation} from "../../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateUrqlClient} from "../../util/createUrqlClient";
import NextLink from "next/link";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [,changePassword] = useChangePasswordMutation();
    const [fatalError, setFatalError] = useState('');
    return (<Wrapper variant="small">
        <Formik
            initialValues={{newPassword: "", newPasswordConfirmed: ""}}
            onSubmit={async (values,{setErrors}) => {
                const response = await changePassword({
                    ...values,
                    token
                });
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors);
                    if ('fatalError' in errorMap){
                        setFatalError(errorMap.fatalError);
                    }
                    setErrors(errorMap);
                } else if (response.data?.changePassword.user){
                    await router.push('/');
                }
            }}
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    {fatalError.length > 0 && <Box>
                        <Box color='red'>{fatalError}</Box>
                        <Box color='green'>
                            <NextLink href="/forgot-password">
                                <Link>Reset password again</Link>
                            </NextLink>
                        </Box>
                    </Box>
                    }
                    <Box><InputField name="newPassword" label="enter new password" placeholder="new password" type="password"/></Box>
                    <Box mt={4}><InputField name="newPasswordConfirmed" label="enter new password again" placeholder="new password again" type="password"/></Box>
                    <Box mt={4}><Button isLoading={isSubmitting} type="submit">login</Button></Box>
                </Form>
            )}
        </Formik>
    </Wrapper>);
}

ChangePassword.getInitialProps = ({query}) =>{
    return {
        token: query.token as string
    }
}


export default withUrqlClient(
    CreateUrqlClient
)(ChangePassword);

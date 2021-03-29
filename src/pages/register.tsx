import React from 'react';
import {Formik, Form} from 'formik';
import {FormControl, FormLabel, Input} from '@chakra-ui/react';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (<div>
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({values, handleChange}) => (
                <Form>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input value={values.username} onChange={handleChange} id="username" placeholder="username"/>

                    </FormControl>
                </Form>
            )}
        </Formik>
    </div>);
}

export default Register;

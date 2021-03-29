import React, {InputHTMLAttributes} from 'react';
import {FormControl, FormLabel, Input, FormErrorMessage} from "@chakra-ui/react";
import {useField} from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    placeholder?: string
    label: string
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder}/>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
}

export default InputField;

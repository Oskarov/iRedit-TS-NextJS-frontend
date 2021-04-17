import React, {InputHTMLAttributes} from 'react';
import {FormControl, FormLabel, Input, FormErrorMessage, Textarea} from "@chakra-ui/react";
import {useField} from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({label, size: _, textarea, ...props}) => {
    let InputOrTextarea : any = Input;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} placeholder={props.placeholder}/>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
}

export default InputField;

import React from 'react'
import { Control, Controller } from 'react-hook-form'

//import MarkDownInput, { MarkDownInputProps } from '../../atoms/MarkDownInput'
import Input, { InputProps } from "../../atoms/Input";

export interface FormMarkDownInputProps extends InputProps {
  control?: Control<any>
  name: string
  defaultValue?: string
  error?: any
  controllerProps?: any
}


const FormMarkDownInput = ({
  controllerProps,
  control,
  name,
  defaultValue,
  error,
  ...rest
}: FormMarkDownInputProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          {...rest}
          value={value as string}
          //onBlur={onBlur}
          onChangeText={onChange}
          isError={!!error}
          errorMessage={error?.message}
        />
      )}
      name={name}
      defaultValue={defaultValue}
      {...controllerProps}
    />
  )
}

export default FormMarkDownInput
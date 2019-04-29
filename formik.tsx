//import liraries
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Button from './Button'

export interface Props {

}

export interface State {
    email: string;
    password: string;
}
// create a component
class FormikTest extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        console.warn('parent')
        return (
            <View style={{width:'100%'}}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, actions) => {
                        this.setState({
                            email: values.email,
                            password: values.password
                        })
                        alert(JSON.stringify(values));
                        setTimeout(() => {
                            actions.setSubmitting(false)
                        }, 1000);

                    }}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .email()
                            .required(),
                        password: yup
                            .string()
                            .min(6)
                            .required(),
                    })}
                    
                >
                    {({ values, handleChange, errors, isSubmitting, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <Fragment>
                            <TextInput
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                placeholder="E-mail"
                            />
                            {touched.email && errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <TextInput
                                value={values.password}
                                onChangeText={handleChange('password')}
                                placeholder="Password"
                                onBlur={() => setFieldTouched('password')}
                                secureTextEntry={true}
                            />
                            {touched.password && errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            {
                                isSubmitting ?
                                    <ActivityIndicator />
                                    :
                                    <Button
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        // style={{backgroundColor:'red'}}
                                    >
                                        Submit
                                    </Button>
                            }
                        </Fragment>
                    )}
                </Formik>
                <Text>{this.state.email}</Text>
                <Text>{this.state.password}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white',
    },
});

//make this component available to the app
export default FormikTest;

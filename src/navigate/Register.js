import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    Alert,
    Image,
    TouchableHighlight
} from 'react-native';

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            role: '',
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            password: ''
        }
    }

    Event_Register = async () => {
        const response = await fetch('https://us-central1-kpscheckin.cloudfunctions.net/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                role:this.state.role,
                mobile:this.state.mobile
            }),
        })
        const responseJson = await response.json()
        if(responseJson.Error === undefined){
            Alert.alert("ADD Success")
            this.props.navigation.navigate('Home')
        }
        else{
            Alert.alert(`${responseJson.Error}`)
        }
         
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="STUDENT ID / PROFESSOR ID"
                        onChangeText={(id) => this.setState({ id })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Nisit/Professor"
                        onChangeText={(role) => this.setState({ role })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="firstname"
                        onChangeText={(firstname) => this.setState({ firstname })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="lastname"
                        onChangeText={(lastname) => this.setState({ lastname })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="mobile"
                        onChangeText={(mobile) => this.setState({ mobile })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="E-Mail"
                        onChangeText={(email) => this.setState({ email })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <TouchableHighlight style={styles.buttonContainer} onPress={this.Event_Register}>
                    <Text>SUBMIT</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
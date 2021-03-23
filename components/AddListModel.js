import React, { Component, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';
import { render } from 'react-dom';
import tempData from '../tempData';



const AddListModel = ({ closeModal, addlist }) => {
    const [name, setname] = useState("");
    const [backgroundColordata, setbackgroundColordata] = useState(["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559",])
    const [col, setcol] = useState(backgroundColordata[0])


    const renderColor = () => {
        return backgroundColordata.map(color => {
            return (
                // <Text>{color}</Text>

                <TouchableOpacity key={color} style={[styles.colorsheet, { backgroundColor: color }]} onPress={() => setcol(color)} />



            )
        })
    }

    const cratetodo = () => {

        // tempData.push({
        //     name,
        //     color: col,
        //     todos: []
        // });
        const list = { name, color: col };
        addlist(list);
        closeModal();
        setname("");

    }



    return (


        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <TouchableOpacity style={{ position: 'absolute', top: 45, right: 32 }} onPress={closeModal}>
                <AntDesign name="close" size={25} color={colors.blue} />

            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 38 }}>
                <Text style={styles.title}>
                    Create Todo List
                </Text>
                <TextInput style={styles.input} placeholder="List name" onChangeText={(val) => setname(val)} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 18 }}>


                    {renderColor()}

                </View>

                <TouchableOpacity style={[styles.create, { backgroundColor: col }]} onPress={cratetodo}>
                    <Text style={{ color: colors.white, fontWeight: "600" }}> Create</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

export default AddListModel;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        alignItems: 'center',
        fontWeight: "800",
        marginBottom: 16,
        color: colors.black,
        alignSelf: "center"
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 9,
        height: 50,
        paddingLeft: 10

    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",


    },
    colorsheet: {
        width: 30,
        height: 30,
        borderRadius: 9,
    }
})



{/* <TouchableOpacity key={color} style={[styles.colorsheet, { backgroundColor: color }]} onPress={setcol(color)} /> */ }

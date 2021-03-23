import React from 'react';
import { useState } from 'react/cjs/react.development';
import colors from '../Colors';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, TextInput, Alert, Keyboard, } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';



export class TodoModal extends React.Component {

    // state = {
    //     name: this.props.list.name,
    //     color: this.props.list.color,
    //     todos: this.props.list.todos,

    // }
    state = {
        newTodo: ""
    }




    render() {

        // console.log("peops...", this.props.list);

        const renderTodo = (todo, index) => {
            return (

                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => toggleTodocompleted(index)}>
                        <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={25} color={colors.gray} style={{ width: 32 }} />
                    </TouchableOpacity>
                    <Text style={[styles.todo, { textDecorationLine: todo.completed ? "line-through" : "none", color: todo.completed ? colors.gray : colors.black }]}>
                        {todo.title}</Text>
                </View>

            )

        }
        const toggleTodocompleted = (index) => {

            let list = this.props.list;
            list.todos[index].completed = !list.todos[index].completed;
            this.props.updateList(list);
        }

        const addTodo = () => {
            if (this.state.newTodo.length === 0) {
                Alert.alert("null vallue")
                return

            }
            let list = this.props.list;
            list.todos.push({ title: this.state.newTodo, completed: false })
            this.props.updateList(list);
            this.setState({ newTodo: "" });
            Keyboard.dismiss();

        }




        // const completedtask = this.state.todos.filter(todo => todo.completed).length
        // const taskCount = this.state.todos.length
        const list = this.props.list
        const completedtask = list.todos.filter(todo => todo.completed).length
        const taskCount = list.todos.length

        return (
            < KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={{ position: 'absolute', top: 15, right: 32 }} onPress={this.props.closeModal}>
                        <AntDesign name="close" size={29} color={colors.blue} />

                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color, marginTop: 25 }]}>

                        <View>
                            <Text style={styles.title}> {list.name}</Text>
                            <Text style={styles.taskCounter}>{completedtask} of {taskCount} tasks </Text>

                        </View>
                    </View>


                    <View style={[styles.section, { flex: 3 }]}>

                        <FlatList data={list.todos} renderItem={({ item, index }) => renderTodo(item, index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]} behavior="padding">
                        <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={(text) => this.setState({ newTodo: text })} value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, { borderColor: list.color }]} onPress={() => addTodo()} >
                            <AntDesign name="plus" size={29} color={colors.white} />

                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </KeyboardAvoidingView>
        )

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        alignSelf: "stretch",
    },
    header: {
        marginLeft: 64,
        justifyContent: 'flex-end',
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        paddingHorizontal: 8,
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 9,
        marginRight: 8,

    },
    addTodo: {
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    }
})
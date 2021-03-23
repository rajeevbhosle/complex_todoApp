import React from 'react';

import { useState } from 'react/cjs/react.development';
import colors from '../Colors';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { TodoModal } from "./TodoModal";


const TodoList = ({ list, updateList }) => {

    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remaining = list.todos.length - completedCount;
    const [showlistvisable, setshowlistvisable] = useState(false);

    const toggleaddmodel = () => {

        setshowlistvisable(!showlistvisable);
    }



    return (

        <View>

            <Modal animationType="slide" visible={showlistvisable} onRequestClose={toggleaddmodel}>

                <TodoModal list={list} closeModal={toggleaddmodel} updateList={updateList} />
            </Modal>

            <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={toggleaddmodel} >
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>


                <View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{remaining}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>

                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>completed</Text>

                    </View>
                </View>



            </TouchableOpacity>
        </View>
    );
}

export default TodoList;

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 9,
        marginHorizontal: 8,
        alignItems: "center",
        width: 200,


    },
    listTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.white,
        marginBottom: 18,


    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white,

    },
    subtitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.white,


    },
})
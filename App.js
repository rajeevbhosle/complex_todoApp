import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, Alert } from 'react-native';
import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/TodoList'
import { AntDesign } from '@expo/vector-icons';
import AddListModel from './components/AddListModel';

import { TododataRef } from "./ConfigFile";




export default class App extends Component {



  state = {
    addTodovisible: false,
    lists: tempData,
  };

  // firebase testing
  componentDidMount() {
    let dAta = []
    TododataRef.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        dAta.push(doc.data());
      })
    })
    // console.log("dAta", dAta);
  }

  render() {





    const toggleaddmodel = () => {

      this.setState({ addTodovisible: !this.state.addTodovisible });

    }


    const renderlist = (list) => {
      // console.log("list...", list)
      return <TodoList list={list} updateList={updateList} />
    }
    const addlist = (list) => {

      // console.log("list...", list);
      // this.setState({ lists: [...this.state.lists, { name: list.name, color: list.color, id: this.state.lists.length + 1, todos: [] }] })
      this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })


      // for firestore testing
      let data = {
        name: list.name,
        color: list.color,
        id: this.state.lists.length + 1,
        todos: []
      }


      TododataRef.add(data).then(() => {//  firestore checking
      })

    }
    const updateList = (list) => {
      console.log("updatelist", list);
      this.setState({
        lists: this.state.lists.map(item => {
          return item.id === list.id ? list : item;
        })
      })

    }



    return (
      <View style={styles.container}>

        <Modal animationType="slide" visible={this.state.addTodovisible} onRequestClose={toggleaddmodel}>
          <AddListModel closeModal={toggleaddmodel} addlist={addlist} />
        </Modal>

        <View style={{ flexDirection: "row" }}>


          <View style={styles.divider} />

          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: "300", color: colors.blue }}>List</Text>
          </Text>

          <View style={styles.divider} />


        </View>

        <View style={{ marginVertical: 48 }}>

          <TouchableOpacity style={styles.addList} onPress={toggleaddmodel}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>

        </View>





        <View style={{ height: 295, padding: 20 }}>

          <FlatList data={this.state.lists} keyExtractor={item => item.name}
            horizontal={true} showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              // <TodoList list={item} />
              renderlist(item)
            )} keyboardShouldPersistTaps="always"
          />
        </View>




      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    height: 1,
    alignSelf: "center",


  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 60,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4

  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,

  },
});

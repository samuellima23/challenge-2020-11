import React, { useState, Component } from 'react';
import { StyleSheet,SafeAreaView,  Text, View, Button, Alert, TextInput, TouchableOpacity, Image, FlatList, KeyboardAvoidingView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import { Divider } from 'react-native-elements';
//import AsyncStorage from '@react-native-community/async-storage';
import {Card} from 'react-native-paper';

export default class Home extends  Component{
  constructor(props){
    super(props);
    this.state={
       data:[], 
       text:(""),
       favoritos:[]
 }
 }

 loadUsers = () =>{
    fetch("http://www.omdbapi.com/?apikey=925eba28&s=batman")
    .then(res=>res.json())
      .then(res=>{
         this.setState({
             data: res.Search || []
                       }
                      )
                 }
          )
 }

 _onFavorite=()=>{

 }

 _onPressButton =(text) => {
  
    fetch("http://www.omdbapi.com/?apikey=925eba28&s="+[this.state.text])
    .then(res=>res.json())
      .then(res=>{
         this.setState({
             data: res.Search || []
                       }
                      )
                 }
          )
 
}
 componentDidMount(){
    this.loadUsers();
 }
  render(text){
// const [text, setText] = useState('');
    
    return (
        <View style={styles.container}>
        <Text style={styles.Header}>
        Lista De filmes
        </Text>
        <KeyboardAvoidingView
        behavior={Platform.select({
            ios: 'padding',
            android: null,
        })}>
        <View style={styles.row}>
        <View>
        <Searchbar style={{width: 275}}
        placeholder="Digite sua busca!"
        onChangeText={(text)=>this.setState({text})}
        /> 
        </View>
        <View>
        <Button title="Buscar" onPress={this._onPressButton}>
        </Button>
        </View>
         </View>
        <SafeAreaView  style={styles.separator}>  
        <FlatList
        data={this.state.data}
        renderItem={({item}) => (
        <View style={styles.line} onPress={this._onPressButton}> 
        <Image source = {{uri:item.Poster}} style={styles.avatar}/>
        <View style={styles.info}>
        <Text style={styles.name}>{item.Title}</Text>
        <Text style={styles.email}>{item.Year}</Text>
        </View>
        </View>    
        )}
        keyExtractor={item=>item.imdbID}/>
        <Divider style={{ backgroundColor: 'white' }} />
        </SafeAreaView >
          <View style={styles.fixToText}>
          <Button
            title="Buscar"
            onPress={this.loadUsers}
          />
          <Button
            title="Favoritos" color="#ffa500"
            onPress={this._onPressButton}
          />
        </View>
        </KeyboardAvoidingView>
        </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    marginHorizontal: 16,
    marginVertical: 45,
    marginTop: Constants.statusBarHeight,

  },
  Header:{
    fontSize: 35, color: '#841584',
  },
  row:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  
  },
   fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:0,
    color:"#841584",
  },
  red: {
    color: 'red',
  },
  line:{
   height:60,
   flexDirection:"row",
   borderBottomColor: 'white',
   borderBottomWidth:2
  },
  avatar:{
   width:50,
   height:50,
   borderRadius:50,
   marginRight:10,
   alignSelf:"auto"
  },
  botao: {
  color:"#841584",
  },
  separator:{
   marginTop:20,
   backgroundColor: "#d3d3d3"
  },
  info:{
    flexDirection:"column",
    justifyContent: "flex-start"
  },
  name:{
fontSize:15

  },
  email:{
    fontSize:15,
    fontWeight: "bold"
  }
}
);


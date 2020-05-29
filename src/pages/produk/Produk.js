import React, { Component } from 'react';
import { View, Text, SafeAreaView, Animated, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import IconToogle from '../../components/commons/IconToogle';
import Icon from '../../components/icon/Icon';
import Axios from 'axios';
import { API_TOKEN, API_URL } from '../../components/externalURL/externalURL';

class produk extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataProduk: [],
         page: 1
      };
      this.navigation = this.props.navigation;


      this.navigation.setOptions({
         headerShown: false
      });
   }

   componentDidMount() {
      this._getDataProduk()
   }

   _getDataProduk = () => {
      Axios.get(API_URL + 'produk?page=' + this.state.page)
         .then(res => {
            console.log(res.data)
         })
         .catch(err => {

         })

   }



   render() {
      return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
               <View ref={ref => this.headerRef = ref} style={{ padding: 10, flexDirection: 'row', alignItems: 'center', }}>
                  <View style={{ marginRight: 10 }}>
                     <Animated.View style={{ alignSelf: 'flex-start', transform: [{ rotate: '90deg' }] }}>
                        <IconToogle onPress={() => this.navigation.goBack()} name="ios-arrow-down" type="Ionicons" color="#14462d" />
                     </Animated.View>
                  </View>

                  <View style={{ width: '85%' }}>
                     <TextInput
                        style={{
                           backgroundColor: '#36a9701a',
                           borderColor: '#14462d',
                           borderWidth: 1.5,
                           padding: 10,
                           paddingRight: 40,
                           height: 40,
                           width: '100%',
                           borderRadius: 5,
                        }}
                     />
                     <TouchableOpacity
                        activeOpacity={.7}
                        style={{
                           position: 'absolute', right: 0,
                           height: '100%', width: 40, backgroundColor: "#14462d",
                           borderTopRightRadius: 5, borderBottomRightRadius: 5,
                           justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Icon type="Feather" name="search" size={20} color="white" />
                     </TouchableOpacity>
                  </View>

               </View>
               <FlatList
                  data={this.state.dataProduk}
               />
            </View>
         </SafeAreaView>
      );
   }
}

export default produk;

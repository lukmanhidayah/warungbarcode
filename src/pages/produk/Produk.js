import React from 'react';
import { View, Text, SafeAreaView, Animated, TextInput, ActivityIndicator, TouchableOpacity, FlatList, Image } from 'react-native';
import IconToogle from '../../components/commons/IconToogle';
import Icon from '../../components/icon/Icon';
import Axios from 'axios';
import { API_TOKEN, API_URL } from '../../components/externalURL/externalURL';
import ItemProduk from '../../components/produk/ItemProduk';

class produk extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         dataProduk: [],
         page: 1,
         isLoading: true,
         searchQuery: "",
      };
   }

   componentDidMount() {
      // this._getDataProduk(this.state.dataProduk, this.state.page, this.state.searchQuery)
   }

   _getDataProduk = (data, page, query) => {
      Axios.get(API_URL + 'produk?page=' + page + '&search=' + query)
         .then(res => {
            if (res.data.status) {
               this.setState({ dataProduk: [...data, ...res.data.data] })
               if (res.data.isHaveNext == false) {
                  this.setState({ isLoading: false })
               }
            } else {
               this.setState({ isLoading: false })
            }
         })
         .catch(err => {
            if (err) {
               console.log(err)
               this.setState({ isLoading: false })
            }
         })

   }


   _onChangeSearch = (text) => {
      this.setState({
         searchQuery: text,
         isLoading: true,
         dataProduk: [],
         page: 1,
      },
         () => this._getDataProduk(this.state.dataProduk, this.state.page, this.state.searchQuery)
      )
   }


   render() {
      return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
               <View ref={ref => this.headerRef = ref} style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                  <View style={{ marginRight: 10 }}>
                     <Animated.View style={{ alignSelf: 'flex-start', transform: [{ rotate: '0deg' }] }}>
                        <IconToogle onPress={() => this.props.navigation.goBack()} name="ios-arrow-down" type="Ionicons" color="#14462d" />
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
                        value={this.state.searchQuery}
                        onChangeText={(text) => this._onChangeSearch(text)}
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
                  keyboardShouldPersistTaps="always"
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.dataProduk}
                  style={{ padding: 10, borderTopWidth: 1, borderColor: '#eee', paddingBottom: 20 }}
                  renderItem={({ item }) => {
                     return (
                        <ItemProduk key={item.id} item={item} />
                     )
                  }}
                  onEndReachedThreshold={1}
                  onEndReached={
                     () => {
                        this.setState({
                           page: this.state.page + 1
                        },
                           () => this._getDataProduk(this.state.dataProduk, this.state.page, this.state.searchQuery)
                        )
                     }
                  }
                  ListFooterComponent={() => {
                     if (this.state.isLoading) {
                        return (
                           <View style={{ padding: 10 }}>
                              <ActivityIndicator size="large" color="#14462d" />
                           </View>
                        )
                     } else {
                        return null
                     }

                  }}
               />
            </View>
         </SafeAreaView>
      );
   }
}

export default produk;

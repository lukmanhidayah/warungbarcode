import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BoxSVG } from '../svg';
import rupiahFormat from '../commons/rupiahFormat';

const ItemProduk = ({ item, onAdd, onEdit }) => (
   <View
      style={{
         backgroundColor: '#feffff',
         width: '95%',
         alignSelf: 'center',
         marginBottom: 8,
         marginTop: 5,
         borderRadius: 5,
         flexDirection: 'row',
         overflow: 'hidden',
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,

         elevation: 5,
         padding: 5
      }}
   >
      <View
         style={{
            width: '35%',
            // backgroundColor: 'blue',
            borderRadius: 5,
            minHeight: 100,
            justifyContent: 'center',
            alignItems: 'center'
         }}>
         {
            item.img === null
               ?
               <BoxSVG width={80} height={100} />
               :
               null
         }
      </View>
      <View style={{ padding: 5, width: '65%' }}>
         <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 13, fontFamily: 'SourceSansPro-Regular', color: '#000' }}>{item.barcode}</Text>
            <Text style={{ fontSize: 18, marginTop: -2, fontFamily: 'SourceSansPro-Bold', color: '#0d2f1e' }}>{item.nama}</Text>
            <Text style={{ fontSize: 16, marginTop: 2, fontFamily: 'SourceSansPro-SemiBold', color: '#14462d' }}>Rp{rupiahFormat(item.harga)}</Text>
         </View>
         <View style={{ marginTop: 8, width: '100%' }}>
            <View style={{ width: '100%', height: 1, backgroundColor: '#eee', borderRadius: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-around' }}>
               <TouchableOpacity
                  onPress={onEdit}
                  activeOpacity={.7}
                  style={{
                     width: '40%',
                     backgroundColor: '#e2e7ff',
                     borderRadius: 2,
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}
               >
                  <Text style={{ padding: 5, fontFamily: 'SourceSansPro-SemiBold', color: '#0d2f1e' }}>Edit</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={onAdd}
                  activeOpacity={.7}
                  style={{
                     width: '40%',
                     backgroundColor: '#36a97054',
                     borderRadius: 2,
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}
               >
                  <Text style={{ padding: 5, fontFamily: 'SourceSansPro-SemiBold', color: '#0d2f1e' }}>Tambah</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   </View>
);

export default ItemProduk;

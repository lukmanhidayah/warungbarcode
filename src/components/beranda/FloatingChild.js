import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../icon/Icon'
const FloatingChild = ({ onPress, nameButton = "Button", iconType, iconName, iconSize, iconColor }) => {
   return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 5 }}>
         <View style={{ padding: 5}}>
            <Text style={{ fontFamily: 'SourceSansPro-Bold',  fontSize: 18, color: '#2c8c5c', textDecorationLine: 'underline' }} >{nameButton}</Text>
         </View>
         <TouchableOpacity onPress={onPress} activeOpacity={.7}
            style={{
               height: 45,
               width: 45,
               backgroundColor: '#2c8c5c',
               borderRadius: 45,
               justifyContent: 'center',
               alignItems: 'center',
               overflow: 'hidden',
               elevation: 5
            }}>
            <View >
               <Icon type={iconType} name={iconName} size={iconSize} color={iconColor} />
            </View>
         </TouchableOpacity>
      </View>
   );
}

export default FloatingChild;

import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native'

import FloatingChild from '../../components/beranda/FloatingChild'
import { EmptySVG } from '../../components/svg'
import Icon from '../../components/icon/Icon'

const { width, height } = Dimensions.get('window')

export class Beranda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlus: true,
        }
        this.rotateValue = new Animated.Value(0)
        this.translateYChild = new Animated.Value(175)
    }

    _buttonFloatingPressed = () => {
        if (this.state.isPlus) {
            Animated.parallel([
                Animated.timing(
                    this.rotateValue,
                    {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.linear,
                        useNativeDriver: true  // To make use of native driver for performance
                    }
                ),
                Animated.timing(
                    this.translateYChild,
                    {
                        toValue: 0,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true  // To make use of native driver for performance
                    }
                )
            ]).start(() => this.setState({ isPlus: false }))

        } else {
            Animated.parallel([
                Animated.timing(
                    this.rotateValue,
                    {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.linear,
                        useNativeDriver: true  // To make use of native driver for performance
                    }
                ),
                Animated.timing(
                    this.translateYChild,
                    {
                        toValue: (175),
                        duration: 300,
                        easing: Easing.linear,
                        useNativeDriver: true  // To make use of native driver for performance
                    }
                )
            ]).start(() => this.setState({ isPlus: true }))

        }

    }


    render() {

        const rotateIcon = this.rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '135deg']
        })

        const opacityFloatingChild = this.rotateValue.interpolate({
            inputRange: [.9, 1],
            outputRange: [0, 1]
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
                <StatusBar barStyle="light-content" backgroundColor="#143e28"   />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 25 }} >
                        <View style={{ width: 200, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                            <EmptySVG width={width / 2} />
                        </View>
                        <Text style={{ fontFamily: 'SourceSansPro-Bold', fontSize: 20, color: '#14462d' }}>Belum ada produk!</Text>
                        <Text style={{ fontFamily: 'SourceSansPro-SemiBold', fontSize: 16, color: '#14462d' }}>Silahkan cari dan tambahkan produk!</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._buttonFloatingPressed()} style={{
                        position: 'absolute', bottom: 20, right: 20, height: 50,
                        width: 50,
                        backgroundColor: '#206341',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        elevation: 5
                    }} activeOpacity={.7}>

                        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                            <Icon type={'MaterialIcons'} name={'add'} size={25} color="white" />
                        </Animated.View>
                    </TouchableOpacity>
                    <Animated.View
                        style={{ position: 'absolute', opacity: opacityFloatingChild, bottom: 75, right: 20, minWidth: 120, transform: [{ translateY: this.translateYChild }] }}
                    >
                        <FloatingChild nameButton="Scan" iconColor="white" iconSize={18} iconName="barcode-scan" iconType="MaterialCommunityIcons" />
                        <FloatingChild onPress={() => this.props.navigation.navigate('Produk')} nameButton="Search" iconColor="white" iconSize={18} iconName="search" iconType="Feather" />
                    </Animated.View>
            </View>
        )
    }
}

export default Beranda

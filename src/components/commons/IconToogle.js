import React, { PureComponent } from 'react'
import { Text, View, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import Icon from '../icon/Icon'

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const maxOpacity = 0.2;
const maxOpacityLong = 0.3;

export class IconToogle extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         maxOpacity,
         scaleValue: new Animated.Value(0.01),
         opacityValue: new Animated.Value(maxOpacity),
         stateLong: {
            maxOpacityLong,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacityLong),
         }
      }
   }



   // let stateLong = {
   //   maxOpacityLong,
   //   scaleValue: new Animated.Value(0.01),
   //   opacityValue: new Animated.Value(maxOpacityLong),
   // };

   onPressedIn = () => {
      Animated.sequence([
         Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 30,
            useNativeDriver: false,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
         }),
         Animated.timing(this.state.scaleValue, {
            toValue: 1,
            useNativeDriver: false,
            duration: 150
         }),
         Animated.timing(this.state.stateLong.scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
         })
      ]).start()

   }

   onPressedOut = () => {
      Animated.timing(this.state.opacityValue, {
         toValue: 0,
         useNativeDriver: false,
      }).start(() => {
         this.state.scaleValue.setValue(0.01);
         this.state.opacityValue.setValue(this.state.maxOpacity);
      });
      Animated.timing(this.state.stateLong.opacityValue, {
         toValue: 0,
         useNativeDriver: false,
      }).start(() => {
         this.state.stateLong.scaleValue.setValue(0.01);
         this.state.stateLong.opacityValue.setValue(this.state.stateLong.maxOpacityLong);
      });

   }

   renderRippleView = () => {
      let { size, color } = this.props
      let sizeCon = size || 25
      let { scaleValue, opacityValue } = this.state;

      let rippleSize = sizeCon * 2;

      return (
         <Animated.View
            style={{
               position: 'absolute',
               width: rippleSize,
               height: rippleSize,
               borderRadius: rippleSize / 2,
               transform: [{ scale: scaleValue }],
               opacity: opacityValue,
               backgroundColor: color || 'black',
            }}
         />
      );
   }

   renderRippleViewLong = () => {
      let { size, color } = this.props
      let sizeCon = size || 25
      let { scaleValue, opacityValue } = this.state.stateLong;

      let rippleSize = sizeCon * 2;

      return (
         <Animated.View
            style={{
               position: 'absolute',
               width: rippleSize,
               height: rippleSize,
               borderRadius: rippleSize / 2,
               transform: [{ scale: scaleValue }],
               opacity: opacityValue,
               backgroundColor: color || 'black',
            }}
         />
      );
   }

   // const { name, size, color, onPress } = this.props;
   render() {
      let { size, small = false, large = false, color, source, onPress, name, type } = this.props;
      let sizeCon = size || 25
      let containerSize = sizeCon * 1.2;
      let iconContainer = { width: containerSize, height: containerSize };

      return (
         <TouchableWithoutFeedback onPress={onPress} onPressIn={this.onPressedIn} delayPressIn={0} onPressOut={this.onPressedOut} style={{ position: 'absolute', padding: 0 }}>
            <Animated.View style={[{ justifyContent: 'center', alignItems: 'center', padding: 0 }, iconContainer]}>
               {this.renderRippleView()}
               {this.renderRippleViewLong()}
               <View>
                  <AnimatedIcon name={name} type={type} size={sizeCon} color={color} />
               </View>
            </Animated.View>
         </TouchableWithoutFeedback>
      );
   }
}

export default IconToogle

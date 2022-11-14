import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    Text,
    Image,
		View
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';
import logoIcon from '../assets/image/header/logoIcon.png'


export const ToastNotice = forwardRef((props, ref) => {
    const [ message, setMessage ] = useState("");
    const toastOpacity = useSharedValue(0);
    const isShowed = useRef(false);
		const [isShown, setIsShown] = useState(false)

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            opacity: toastOpacity.value,
        }
    }, []);
    
    useImperativeHandle(ref, () => ({
        show: show
    }));

    const turnOnIsShow = useCallback(()=>{
      isShowed.current = false;
      setIsShown(false)
    }, []);
    
    const show = useCallback((message) => {
        if (!isShowed.current) {
            setMessage(message);
            isShowed.current = true;
						setIsShown(true)
            toastOpacity.value = withSequence(
                withTiming(1, { duration: 500 }), 
                withTiming(1, {duration: 800}),
                withTiming(0, { duration: 1200 }, () => {
                    runOnJS(turnOnIsShow)();
                }),
            );
        }
    }, []);

    return (
			<>
			{isShown ?
			<Animated.View style={[ styles.rootContainer, animatedStyle]}>
          <Image style={{width:20, height:20}} source={logoIcon}/>
					<Text style={styles.message}>{message}</Text>
			</Animated.View>	:		
			<></>
			}
			</>
    );
})

const styles = StyleSheet.create({
    rootContainer: {
        paddingTop:15,
        flexDirection:'row',
        zIndex:100,
        width:410,
        position:'absolute',
        top: 0,
        backgroundColor: "#FFFEFA",
        paddingVertical: 9,
        paddingHorizontal: 23,
        borderRadius: 10,
        left:'50%',
        height:50,
        transform:[{translateX:-205}],
        elevation:10
    },
    message: {
      marginLeft:10,
        color: "#525252",
        textAlign:'center'
    }
});

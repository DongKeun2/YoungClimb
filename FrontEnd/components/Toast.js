import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    Text,
		View
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';


export const Toast = forwardRef((props, ref) => {
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
                withTiming(1, {duration: 500}),
                withTiming(0, { duration: 1000 }, () => {
                    runOnJS(turnOnIsShow)();
                }),
            );
        }
    }, []);

    return (
			<>
			{isShown ?
			<Animated.View style={[ styles.rootContainer, animatedStyle ]}>
					<Text style={styles.message}>{message}</Text>
			</Animated.View>	:		
			<></>
			}
			
			</>
    );
})

const styles = StyleSheet.create({
    rootContainer: {
        zIndex:10,
        width:340,
        position: "absolute",
        bottom: 15,
        backgroundColor: "#F34D7F",
        paddingVertical: 9,
        paddingHorizontal: 23,
        borderRadius: 100,
        left:'50%',
        transform:[{translateX:-170}]
    },
    message: {
        color: "rgb(255, 255, 255)"
    }
});

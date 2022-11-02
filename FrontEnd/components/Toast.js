import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    StyleSheet,
    Text
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
    }, []);
    
    const show = useCallback((message) => {
        if (!isShowed.current) {
            setMessage(message);
            isShowed.current = true;
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
        <Animated.View style={[ styles.rootContainer, animatedStyle ]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
})

const styles = StyleSheet.create({
    rootContainer: {
        position: "absolute",
        bottom: 30,
        backgroundColor: "#F34D7F",
        paddingVertical: 9,
        paddingHorizontal: 23,
        borderRadius: 100,
        left:40
    },
    message: {
        color: "rgb(255, 255, 255)"
    }
});

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";

const DoubleTapHeart = (props) => {
  const delayTime = props.delay ? props.delay : 300;
  const [firstPress, setFirstPress] = useState(true);
  const [lastTime, setLastTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  let timer = false;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeout = props.timeout ? props.timeout : 1000;
  useEffect(() => {
    if (modalVisible) {
      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, timeout);
      setModalVisible(false);
    }
  }, [fadeIn, fadeOut, modalVisible]);

  useEffect(() => {
    if (timer) clearTimeout(timer);
  }, [timer]);

  const onPress = () => {
    const now = new Date().getTime();

    if (firstPress) {
      setFirstPress(false);

      timer = setTimeout(() => {
        setFirstPress(true);
      }, delayTime);

      setLastTime(now);
    } else if (now - lastTime < delayTime) {
      setModalVisible(true);
      if (timer) clearTimeout(timer);
      props.doubleClick();
      setFirstPress(true);
    }
  };

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {props.icon && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              ...styles.favoriteIcon,
            }}
          >
            <Image
              source={require("../../../assets/heart.png")}
              style={{
                height: 125,
                width: 125,
              }}
            />
          </Animated.View>
        )}
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    position: "absolute",
    zIndex: 10,
    marginTop: 160,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoubleTapHeart;

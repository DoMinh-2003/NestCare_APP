import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/model/NavigationType';


export default function oauthredirect() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  useEffect(() => {
    // const handleRedirect = async () => {
    //   const token = await AsyncStorage.getItem("token");
    //   if (token) {
    //     navigation.navigate("HomeMentor");
    //   } else {
    //     navigation.navigate("Login");
    //   }
    // };

    // handleRedirect();
    navigation.navigate('login')
  }, []);

  return <></>;
}

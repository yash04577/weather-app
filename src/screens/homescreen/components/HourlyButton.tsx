import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

type Props = {
  isSelected?:boolean,
  hourData:any
}

function convertToAmPm(time24) {
  // Split the time string into hours, minutes, and seconds
  let [hours, minutes, seconds] = time24.split(':');
  
  // Convert hours from string to number
  hours = parseInt(hours);

  // Determine the AM/PM suffix
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Return the formatted time string
  return `${hours.toString().padStart(2, '0')}: ${ampm}`;
}

function fahrenheitToCelsius(fahrenheit:any) {
  return (fahrenheit - 32) * 5 / 9;
}

const HourlyButton = ({isSelected, hourData}: Props) => {
  return (
    // <ScrollView horizontal>

    <View className="w-[60px] h-[150px] mx-2 flex justify-center items-center">
      <View className={`w-full h-full bg-[#48319D] ${isSelected ? "opacity-80" : "opacity-20"} absolute rounded-[30px] border border-white`}></View>
      {/* <View className="w-full h-full bg-[#48319D] opacity-20 absolute rounded-[30px] border border-white"></View> */}
      <Text className="text-[15px] font-semibold text-white opacity-100 pb-3">{convertToAmPm(hourData?.datetime)}</Text>
      <Image source={require("../../../assets/images/mooncloud.png")} />
      <Text className="text-[20px] text-white opacity-100">{fahrenheitToCelsius(hourData?.feelslike).toFixed(1)}</Text>
    </View>
    // </ScrollView>
  )
}

export default HourlyButton

const styles = StyleSheet.create({})
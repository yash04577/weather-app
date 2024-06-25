import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HourlyButton from './components/HourlyButton';
import axios from 'axios';
// import {  } from 'react-native-safe-area-context'

type Props = {};

const Home = (props: Props) => {
  const [location, setLocation] = useState("rudrapur");
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState();
  const [date, setDate] = useState();

  useEffect(()=>{
    const dateString = new Date(Date.now());
    setDate(dateString?.toISOString()?.slice(0,10));
    
  })


  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/?key=TXDPU694LE4A6YT3EX5QF8E88`;

  const getData = async () => {
    try {
      
      let res = await axios.get(apiUrl);
      setData(res.data);

    } catch (error) {
      console.log("err on api ", error)
    }
  };

  function fahrenheitToCelsius(fahrenheit:any) {
    return (fahrenheit - 32) * 5 / 9;
  }

  useEffect(()=>{
    setTemp(fahrenheitToCelsius(data?.currentConditions?.feelslike))
  }, [data])

  useEffect(() => {
    getData();
  }, [date]);

  return (
    // <SafeAreaView>

    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}>
        <View className="w-[390px] flex justify-center items-center">
          <View className="flex flex-row justify-center items-center gap-5">
            <TextInput 
              placeholder='Search location...'
              placeholderTextColor={"white"}
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity onPress={getData}><Text className="text-white">Search</Text></TouchableOpacity>
          </View>
          
          <Text className="text-[34px] text-[#FFFFFF] capitalize">{data?.address}</Text>
          <Text className="text-[96px] font-light text-[#FFFFFF]">{temp?.toFixed(1)} C</Text>
          <Text className="text-[20px] text-[#EBEBF5] opacity-60">
            {data?.currentConditions?.conditions}
          </Text>
          <Text className="text-[20px] font-semibold text-[#FFFFFF]">
            H:{fahrenheitToCelsius(data?.days[0].tempmax).toFixed(1)} L:{fahrenheitToCelsius(data?.days[0].tempmin).toFixed(1)}
          </Text>
        </View>

        <View className="w-[390px] h-[390px]">
          <Image
            source={require('../../assets/images/House.png')}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <View
          className="flex flex-row h-[250px] w-full absolute bottom-[0px] border-2 border-red-500"
          style={styles.glass}>
          <ScrollView horizontal className="">
            {/* <HourlyButton />
            <HourlyButton />
            <HourlyButton isSelected={true} />
            <HourlyButton />
            <HourlyButton />
            <HourlyButton />
            <HourlyButton />
            <HourlyButton />
            <HourlyButton /> */}

            {
              data?.days[0]?.hours?.map((hour:any)=>
               <HourlyButton hourData={hour} /> 
              )

              // console.log(data)
            }

          </ScrollView>
        </View>
      </ImageBackground>
    </View>
    // </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },

  glass: {
    // width: 300,
    // height: 200,
    backgroundColor: 'rgba(62, 59, 110, 0.9)',
    borderTopEndRadius: 50,
    borderTopLeftRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  // Apply blur effect using backdrop filter
  blur: {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
});

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity,temp_min,temp_max },
            wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: '#FFD662FF', fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: 'white', fontWeight: 'bold'}}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: 'black',}}>{temp} °C</Text>
                </View>

                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center' }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center'}}>{speed} m/s</Text>
                    </View>
                   
                
                </View>

                <View style={styles.extra_info}>
                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center' }}>Min Temp {temp_min}°C</Text>

                        <Text style={{ fontSize: 22, color: 'white',textAlign: 'center' }}>Max Temp: {temp_max}°C </Text>
            
                </View>
                

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: '#0063B2FF',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        
    },
    extra_info: {
        backgroundColor: '#2BAE66FF',
        padding: 15,
        borderRadius: 15,
        width: '90%',
        marginLeft:'5%',
        marginTop:'8%',
        
    }
});
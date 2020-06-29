import React,{useEffect, useState} from 'react';
import {Text,View, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker,Callout,CalloutSubview,Polygon} from 'react-native-maps'
import antalya from './antalya'
const App = () => {

    const coordAntalyaCity = {
            latitude: 36.895924,
            longitude: 30.710007,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
    };

    const polygonCoords = antalya.geometries[0].coordinates[0][0].map((c) => {
        return {longitude: c[0], latitude: c[1]};
    });

    const [value] = useState( new Animated.Value(0));
    const interPolate = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '10'],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(value, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ).start();
    }, [value]);

    return(
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                initialRegion={coordAntalyaCity}>
                <Polygon coordinates={polygonCoords} />
                <Marker coordinate={coordAntalyaCity} anchor={{x: 0.5, y: 0.5}}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Animated.View
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: 5,
                                transform: [{scale: interPolate}],
                                backgroundColor: 'rgba(107,210,54,0.6)',
                            }}
                        />
                    </View>
                </Marker>
                <Marker
                title="Antalya"
                coordinate = {coordAntalyaCity}
                pinColor="green"
                >
                    <Callout onPress={() => alert("Yönlendirme")}>
                        <Text>
                            ilker
                        </Text>
                    </Callout>
                </Marker>
            </MapView>
    )
};




export default App

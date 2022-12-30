import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import initialLocations from "./data/locations.json";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { getDistance, getPreciseDistance } from "geolib";

const icons = {
  church: require("./assets/church.png"),
  mountain: require("./assets/mountain.png"),
  shopping: require("./assets/shop.png"),
  attraction: require("./assets/attraction.png"),
  monument: require("./assets/monument.png"),
  business: require("./assets/business.png"),
};

export default function App() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();
  }, []);

  const places = initialLocations.map((data, i) => {
    let k = 0;
    if (data.type == "church") {
      k = 1;
    } else if (data.type == "mountain") {
      k = 2;
    } else if (data.type == "shopping") {
      k = 3;
    } else if (data.type == "attraction") {
      k = 4;
    } else if (data.type == "monument") {
      k = 5;
    } else if (data.type == "business") {
      k = 6;
    }
    var dis = getDistance(
      { latitude: latitude, longitude: longitude },
      {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      }
    );
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
        }}
        title={data.name}
        description={` ${dis / 1000} KM`}
        image={k}
      />
    );
  });

  return (
    <MapView
      initialRegion={{
        latitude: 48.859,
        longitude: 2.347,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{ flex: 1 }}
    >
      {places}
    </MapView>
  );
}

const styles = StyleSheet.create({});

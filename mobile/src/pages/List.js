import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from "react-native";
import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.20:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear("user");
    await AsyncStorage.clear("techs");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map((tech, index) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30
  }
});

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";


export default function Search() {
  const [airport, setAirport] = useState("");
  const [currentWait, setCurrentWait] = useState(null);
  const [todayWaits, setTodayWaits] = useState([]);

  const fetchWaitTimes = async () => {
    const res = await fetch(
      `http://192.168.0.157:3000/api/wait-times?airport=${airport.toUpperCase()}`
    );
    const data = await res.json();

    const today = new Date().toLocaleString("en-US", { weekday: "short" });
    const todayData = data.filter((item) => item.day === today);

    setTodayWaits(todayData);

    // Detect local hour and get current wait time
    const currentHour = new Date().getHours();
    const formattedHour = formatToHourRange(currentHour);
    const current = todayData.find((d) => d.hour.startsWith(formattedHour));
    setCurrentWait(current?.avg_wait || "N/A");
  };

  const formatToHourRange = (hour) => {
    const hour12 = hour % 12 || 12;
    const meridian = hour >= 12 ? "PM" : "AM";
    return `${hour12} ${meridian}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Airport Wait Time Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter IATA code (e.g. JFK)"
        value={airport}
        onChangeText={setAirport}
      />
      <Button title="Search" onPress={fetchWaitTimes} />

      {currentWait && (
        <View style={styles.waitBox}>
          <Text style={styles.gaugeTitle}>Current Wait Time</Text>
          <Text style={styles.waitTime}>{currentWait}</Text>
        </View>
      )}

      {todayWaits.length > 0 && (
        <View>
          <Text style={styles.chartTitle}>Today's Wait Time Chart</Text>
          <LineChart
            data={{
              labels: todayWaits.map((d) => d.hour.split(" - ")[0]),
              datasets: [{ data: todayWaits.map((d) => parseInt(d.avg_wait)) }],
            }}
            width={Dimensions.get("window").width - 20}
            height={220}
            yAxisSuffix="m"
            chartConfig={{
              backgroundColor: "#f5f5f5",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: () => "#1f2937",
              labelColor: () => "#6b7280",
              propsForDots: { r: "4", strokeWidth: "1", stroke: "#1f2937" },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  waitBox: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#e0f2fe",
    marginVertical: 15,
    alignItems: "center",
  },
  waitTime: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0284c7",
  },
  gaugeTitle: { fontSize: 16, marginBottom: 5 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  chart: { borderRadius: 8 },
});

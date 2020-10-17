import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Citas } from "./components/Citas";

export const App = () => {
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Johnny", propietario: "Juan", sintomas: "No come" },
    {
      id: "2",
      paciente: "Johnny2",
      propietario: "Juan2",
      sintomas: "No come2",
    },
    {
      id: "3",
      paciente: "Johnny3",
      propietario: "Juan3",
      sintomas: "No come3",
    },
  ]);

  const handlerEliminar = (id) => {
    setCitas((citasActivas) => citasActivas.filter((cita) => cita.id !== id));
  };

  return (
    <View style={style.contenedot}>
      <Text style={style.titulo}>Administrador de citas</Text>
      <Text style={style.titulo}>
        {" "}
        {citas.length > 0
          ? "Administra tus citas"
          : "No hay citas, agrega una"}{" "}
      </Text>
      <FlatList
        data={citas}
        renderItem={({ item: { paciente, propietario, sintomas, id } }) => (
          <Citas
            paciente={paciente}
            propietario={propietario}
            sintomas={sintomas}
            id={id}
            handlerEliminarFuncion={handlerEliminar}
          />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

const style = StyleSheet.create({
  contenedot: { backgroundColor: "#AA076B", flex: 1 },
  titulo: {
    marginTop: 40,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

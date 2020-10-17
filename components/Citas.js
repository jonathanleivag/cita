import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export const Citas = ({
  paciente,
  propietario,
  sintomas,
  handlerEliminarFuncion,
  id,
}) => {
  return (
    <View style={style.cita}>
      <View>
        <Text style={style.label}>paciente: </Text>
        <Text style={style.texto}>{paciente}</Text>
      </View>
      <View>
        <Text style={style.label}>propietario: </Text>
        <Text style={style.texto}>{propietario}</Text>
      </View>
      <View>
        <Text style={style.label}>sintomas: </Text>
        <Text style={style.texto}>{sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => handlerEliminarFuncion(id)}
          style={style.btnEliminar}
        >
          <Text style={style.textoEliminar}>ELminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cita: {
    backgroundColor: "#fff",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: { fontSize: 18 },
  btnEliminar: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  textoEliminar: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

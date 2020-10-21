import AsyncStorage from "@react-native-community/async-storage";
import React, { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Citas } from "./components/Citas";
import { Formulario } from "./components/Formulario";

export const App = () => {
  const [show, setShow] = useState(false);

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem("citas");
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerCitas();
  }, []);

  const handlerEliminar = (id) => {
    const citasFiltradas = citas.filter((cita) => cita.id !== id);
    setCitas(citasFiltradas);
    guardarAsyncStorage(citasFiltradas);
  };

  const showForm = () => {
    setShow(!show);
  };

  const guardarAsyncStorage = async (citaJSON) => {
    try {
      await AsyncStorage.setItem("citas", JSON.stringify(citaJSON));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.contenedor}>
        <Text style={style.titulo}>Administrador de citas</Text>

        <View>
          <TouchableHighlight onPress={() => showForm()} style={style.btnShow}>
            <Text style={style.textoShow}>
              {show ? "Cancelar cita" : "Crear nueva cita"}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={style.contenido}>
          {show ? (
            <Fragment>
              <Text style={style.titulo}>Crear nueva cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setShow={setShow}
                guardarAsyncStorage={guardarAsyncStorage}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Text style={style.titulo}>
                {" "}
                {citas.length > 0
                  ? "Administra tus citas"
                  : "No hay citas, agrega una"}{" "}
              </Text>
              <FlatList
                style={style.listado}
                data={citas}
                renderItem={({ item: { paciente, dueno, sintomas, id } }) => (
                  <Citas
                    paciente={paciente}
                    dueno={dueno}
                    sintomas={sintomas}
                    id={id}
                    handlerEliminarFuncion={handlerEliminar}
                  />
                )}
                keyExtractor={({ id }) => id}
              />
            </Fragment>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  contenedor: { backgroundColor: "#AA076B", flex: 1 },
  titulo: {
    marginTop: Platform.OS === "ios" ? 40 : 20,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  listado: {
    flex: 1,
  },
  btnShow: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
    backgroundColor: "#7d024e",
  },
  textoShow: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

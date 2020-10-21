import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

export const Formulario = ({
  citas,
  setCitas,
  setShow,
  guardarAsyncStorage,
}) => {
  const [paciente, setPaciente] = useState("");
  const [dueno, setDueno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDate(
      date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    );
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setTime(
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })
    );
    hideTimePicker();
  };

  const createNewCite = () => {
    if (
      paciente.trim() === "" ||
      dueno.trim() === "" ||
      telefono.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      sintomas.trim() === ""
    ) {
      showAlert();
      return;
    }

    const cita = { paciente, dueno, telefono, date, time, sintomas };
    cita.id = shortid.generate();
    const citasNueva = [...citas, cita];
    setCitas(citasNueva);
    guardarAsyncStorage(citasNueva);
    setShow(false);
  };

  const showAlert = () => {
    Alert.alert("Error", "Todos los campos son obligatorio", [{ text: "ok" }]);
  };

  return (
    <Fragment>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setDueno(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Telefono contacto: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha: </Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text> {date} </Text>
        </View>

        <View>
          <Text style={styles.label}>Hora: </Text>
          <Button title="Show Time Picker" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            locale="es_ES"
            is24Hour
          />
          <Text> {time} </Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas: </Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => createNewCite()}
            style={styles.btnSubmit}
          >
            <Text style={styles.textoSubmit}>Crear nueva cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
    backgroundColor: "#7d024e",
    marginBottom: 50,
  },
  textoSubmit: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

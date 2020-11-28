import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';

export default function App() {

  const [save, setSave] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [enteredPrice, setEnterdPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [record, setRecord] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayfp, setDisplayfp] = useState("");
  const [displayD, setDisplayD] = useState("");
  const [displayOp, serDisplayOp] = useState("");

  function Calculate() {
    var disc = parseFloat(discount);
    var price = parseFloat(enteredPrice);
    if (disc > 100) {
      Alert.alert("invalid number", "Discount value must be less than equal to 100");
      setDiscount("");
      return;
    }
    if (enteredPrice !== "" && discount !== "") {
      var calc = (price * disc) / 100;
      setSave(calc.toFixed(2));
      var difference = price - calc;
      setFinalPrice(difference.toFixed(2));
    }
  }

  function saveRecord() {

    var finalP = finalPrice.toString();
    var op = parseFloat(enteredPrice);
    setRecord((record) => [...record, enteredPrice]);
    setRecord((record) => [...record, discount]);
    setRecord((record) => [...record, finalP]);

    console.log(record);
    setIndex(index + 1);
  }
  function setDisplay() {

    var valuesfp = "";
    var valuesOp = "";
    var valuesDp = "";
    var check = 0;
    for (let i = 0; i < record.length; i++) {
      if (check === 0) {
        valuesOp += record[i] + "\n";
      }
      if (check === 1) {
        valuesDp += record[i] + "\n"
      }
      if (check === 2) {
        valuesfp += record[i] + "\n"
      }
      check++;
      if (check == 3) {
        check = 0;
      }
    }

    setDisplayfp(valuesfp);
    setDisplayD(valuesDp);
    serDisplayOp(valuesOp);
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discount Calculator</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.footer,]}>
          <Text style={styles.textStyle}>Original Price:</Text>
          <View>
            <TextInput keyboardType="numeric" style={styles.inputBox} onChangeText={(enteredPrice) => setEnterdPrice(enteredPrice)} value={enteredPrice} onEndEditing={Calculate} placeholder="Enter total amount"></TextInput>

          </View>
          <Text style={[styles.textStyle]}>Discount Percentage:</Text>
          <TextInput keyboardType="numeric" style={styles.inputBox}
            onChangeText={(discount) => setDiscount(discount)} value={discount} onEndEditing={Calculate} placeholder="Enter discount offered"></TextInput>
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <Text style={[styles.textStyle, { fontSize: 30 }]}>You Save </Text>
            <Text style={styles.resultText}>{enteredPrice === "" || discount === "" ? "--" : save}</Text>
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Final Price </Text>
            <Text style={styles.resultText}>{enteredPrice === "" || discount === "" ? "--" : finalPrice}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "10%" }}>
            <TouchableOpacity onPress={() => saveRecord()} style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={() => { setModalVisible(true); setDisplay(); }}>
              <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                  <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Original Price</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Discount</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Final Price</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <Text style={{ fontSize: 15, }}>{displayOp}</Text>
                        <Text style={{ fontSize: 15, }}>{displayD}</Text>
                        <Text style={{ fontSize: 15, }}>{displayfp}</Text>
                      </View>
                      <TouchableHighlight style={styles.openButton} onPress={() => { setModalVisible(!modalVisible); }} >
                        <Text style={styles.MbtextStyle}>Hide History</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                <Text style={styles.buttonTextStyle} >History</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01877C',
  },
  header: {
    flex: 0.65, justifyContent: "center", alignItems: "center"
  },
  footer: {
    flex: 2, backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 50, paddingHorizontal: 30
  },
  headerText: {
    fontSize: 35, color: "white", fontWeight: "bold"
  },
  textStyle: {
    fontSize: 23, textAlign: "left", color: "#01877C", fontWeight: "bold"
  },
  inputBox: {
    width: "80%", height: 40, borderColor: "#05375a", borderWidth: 2, borderTopWidth: 0, borderLeftColor: 0, borderRightWidth: 0, marginBottom: 20, fontSize: 20, marginTop: 4
  },
  resultText: { fontSize: 25, textAlign: "center", marginTop: 10, marginBottom: 10, fontWeight: "bold" },
  buttonStyle: {
    backgroundColor: "#01877C", width: "40%", height: 60, justifyContent: "center", alignItems: "center", borderRadius: 15
  },
  buttonTextStyle: {
    color: "white", fontSize: 24, fontWeight: "bold"
  },
  centeredView: {
    flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22
  },
  modalView: {
    width: "90%", margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, shadowColor: "#000", shadowOffset: {
      width: 0, height: 2
    }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5
  },
  openButton: {
    backgroundColor: "#2196F3", borderRadius: 20, padding: 10, elevation: 2, marginTop: 5
  },
  modalText: {
    marginBottom: 15, textAlign: "justify", alignContent: "space-between", justifyContent: "space-evenly"
  },

  MbtextStyle: {
    color: "white", fontWeight: "bold", textAlign: "center"
  },

});

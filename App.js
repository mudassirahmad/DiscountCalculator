import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Modal, TouchableHighlight, ScrollView,KeyboardAvoidingView} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

function screen({ navigation , route}){
  const [save, setSave] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [enteredPrice, setEnterdPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [record, setRecord] = useState([]);
  const [index, setIndex] = useState(0);
  const [checkFields,setcheckFields] = useState(true);
  const [displayfp, setDisplayfp] = useState("");
  const [displayD, setDisplayD] = useState("");
  const [displayOp, serDisplayOp] = useState("");

  useEffect(()=>{
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
    
  },[record]);

  useEffect(()=>{
    if(route.params?.returnArray){
      setRecord(route.params.returnArray);
      navigation.setParams({returnArray: undefined});
    }
  });

  useEffect(()=>{
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
  },[discount,enteredPrice])
  useEffect(()=>{
    if(discount!=="" && enteredPrice!==""){
      setcheckFields(false);
    }
  },[discount, enteredPrice])


  function saveRecord() {

    var finalP = finalPrice.toString();
    var op = parseFloat(enteredPrice);
    
    setRecord((record) => [...record, enteredPrice]);
    setRecord((record) => [...record, discount]);
    setRecord((record) => [...record, finalP]);
    setIndex(index + 1);
    //setDisplay();
  }
  

  return (

    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    enabled={Platform.OS === "ios" ? false : false}
    style={styles.container} >
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Discount Calculator</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
        <View style={[styles.footer,]}>
  
          <View > 
          <Text style={styles.textStyle}>Original Price:</Text>
          <View>
            <TextInput keyboardType="numeric" style={styles.inputBox} onChangeText={(enteredPrice) => setEnterdPrice(enteredPrice)} value={enteredPrice} placeholder="Enter total amount"></TextInput>

          </View>
          <Text style={[styles.textStyle]}>Discount Percentage:</Text>
          <TextInput keyboardType="numeric" style={styles.inputBox}
            onChangeText={(discount) => setDiscount(discount)} value={discount}  placeholder="Enter discount offered"></TextInput>
            </View>


          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[styles.textStyle, { fontSize: 30 }]}>You Save </Text>
            <Text style={styles.resultText}>{enteredPrice === "" || discount === "" ? "--" : save}</Text>
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Final Price </Text>
            <Text style={styles.resultText}>{enteredPrice === "" || discount === "" ? "--" : finalPrice}</Text>
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity onPress={() => {saveRecord(); setcheckFields(true); }} disabled={checkFields} style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonStyle}  onPress={() => { setDiscount("");setEnterdPrice("");navigation.navigate('History', {priceList: record, fp:displayfp,
            Op:displayOp, D:displayD})}}>
              <View>
                
                <Text style={styles.buttonTextStyle} >History</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );

}

function History({ navigation, route }){
  const priceFromHome = route.params.priceList;
  const [FP,setFP]=useState(route.params.fp);
  const [OP,setOP]=useState(route.params.Op);
  const [Disc,setD]=useState(route.params.D);
  var [history, setHistory] = useState(priceFromHome);
  function deleteHistory(){
    setHistory([]);
    setOP("");
    setFP("");
    setD("");
    console.log(history);
  }
  
  return(
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
      </View>

    <View style={styles.footer}>

      
        <View >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Original Price</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Discount %</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Final Price</Text>
                       {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>Action</Text>*/}
                      </View>
                      
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:10 }}>
                        <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{ fontSize: 15,  marginTop:10  }}>{OP}</Text>
                        
                        </View>
                        <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{ fontSize: 15,  marginTop:10  }}>{Disc}</Text>
                        
                        </View><View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{ fontSize: 15,  marginTop:10  }}>{FP}</Text>
                        
                        </View>
                        
                      </View>
        </View>
        <View style={{flex:1, justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>{navigation.navigate("Home",{returnArray: history})}}>
              <Text style={styles.buttonTextStyle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonStyle, {width:"50%"}]} onPress={(history)=> deleteHistory()}>
              <Text style={styles.buttonTextStyle}>Clear History</Text>
            </TouchableOpacity>
        </View>
    </View>
  </View>
  );
  
}



const Stack = createStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="screen">
        <Stack.Screen name="Home" options={{headerShown:false}} component={screen} />
        <Stack.Screen name="History" options={{headerShown:false}} component={History} />
      </Stack.Navigator>
    </NavigationContainer>
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
    flex: 2,display:"flex", backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 50, paddingHorizontal: 30, justifyContent:"space-between"
  },
  headerText: {
    fontSize: 35, color: "white", fontWeight: "bold"
  },
  textStyle: {
    fontSize: 23, textAlign: "left", color: "#01877C", fontWeight: "bold"
  },
  inputBox: {
    width: "80%", height: 40, borderColor: "#05375a", borderWidth: 2, borderTopWidth: 0,borderLeftWidth:0, borderRightWidth: 0, marginBottom: 20, fontSize: 20, marginTop: 4
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

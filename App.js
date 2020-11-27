import { StatusBar } from 'expo-status-bar';
import React, { useState , Component, useEffect} from 'react';
import {  StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

export default function App() {

  const [save, setSave] = useState();
  const [finalPrice, setFinalPrice]= useState();
  const [enteredPrice, setEnterdPrice]= useState("");
  const [discount , setDiscount]= useState("");
  const [check, setCheck]=useState(2);
  

  /*const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );*/
  useEffect(()=>{
    setCheck(0);
  }, []);

  function Calculate(){
    var disc= parseFloat(discount);
    var price= parseFloat(enteredPrice);
    if(disc>100){ 
      Alert.alert("invalid number", "Discount value must be less than equal to 100");
      setDiscount("");
      return;
    }
    if(enteredPrice!=="" && discount!==""){
      var calc=(price*disc)/100;
      setSave(calc.toFixed(2));
      var difference= price - calc;
      setFinalPrice(difference.toFixed(2));
      setCheck(1);
    }
  }

  return (
    
    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Discount Calculator</Text>
       </View>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View style={[styles.footer, ]}>
          <Text style={styles.textStyle}>Original Price:</Text>
          <View>
            <TextInput keyboardType="numeric"  style={styles.inputBox}  onChangeText={(enteredPrice)=>setEnterdPrice(enteredPrice)} value={enteredPrice} onEndEditing={Calculate}  placeholder="Enter total amount"></TextInput>
            
          </View>
          <Text style={[styles.textStyle]}>Discount Percentage:</Text>
          <TextInput keyboardType="numeric" style={styles.inputBox } 
           onChangeText={(discount)=>setDiscount(discount)} value={discount} onEndEditing={Calculate} placeholder="Enter discount offered"></TextInput>
          <View style={{alignItems:"center", justifyContent: "center", marginTop:70}}>
          <Text style={[styles.textStyle, {fontSize:30}]}>You Save </Text>
          <Text style={{fontSize:25, textAlign:"center", marginTop:10, marginBottom:10, fontWeight:"bold"}}>{enteredPrice==="" || discount===""? "--":save}</Text>
          <Text style={[styles.textStyle, {fontSize:30}]}>Final Price </Text>
          <Text style={{fontSize:25, textAlign:"center", marginTop:10, marginBottom:10, fontWeight: "bold"}}>{enteredPrice===""  || discount===""? "--":finalPrice}</Text>
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
  footer:{
    flex: 2, backgroundColor:"#fff", borderTopLeftRadius:30, borderTopRightRadius:30, paddingVertical: 50,paddingHorizontal: 30
  },
  headerText:{
    fontSize: 35, color:"white", fontWeight: "bold"
  },
  textStyle:{
    fontSize: 23, textAlign:"left", color: "#01877C", fontWeight: "bold"
  },
  inputBox:{
    width:"80%", height:40,borderColor:"#05375a", borderWidth: 2, borderTopWidth:0, borderLeftColor:0, borderRightWidth:0, marginBottom:20, fontSize:20, marginTop:4
  }
});

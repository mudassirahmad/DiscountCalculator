import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

export default function App() {

  const [value, onChangeText] = React.useState('Useless Placeholder');
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


  return (
    <DismissKeyboard>

    
    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Discount Calculator</Text>
       </View>
       <View style={[styles.footer, ]}>
          <Text style={styles.textStyle}>Original Price:</Text>
            <TextInput keyboardType="numeric" onSubmitEditing={Keyboard.dismiss} style={styles.inputBox } placeholder="Enter total amount"></TextInput>
              
          <Text style={[styles.textStyle]}>Discount Percentage:</Text>
          <TextInput keyboardType="numeric" onSubmitEditing={Keyboard.dismiss} style={styles.inputBox } placeholder="Enter discount offered"></TextInput>
       </View>
    </View>
    </DismissKeyboard>
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

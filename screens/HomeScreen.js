import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from '../config.js';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressed: [],
      absentPressed: [],
    };
  }



componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = []
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      
    });
  };

   updateAttendence(roll_no, status) {
    var id = '';
    
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } 

    else {
      id = roll_no;
    }
     

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

goToSummary = ()=>{
    this.props.navigation.navigate('SummaryScreen')
  }

  
  render(){
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
        return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Student Found</Text>
        </View>
      );
    } 
    else{
        return(
          <View style={styles.container}>

          <View style={{ flex: 3 }}>
          
            {all_students.map((student, index) => (
              <View key={index} style={styles.list}>
                  <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold',marginRight: 15 }}>
                    {student.roll_no}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight:'bold' }}>student</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  
                  <TouchableOpacity
                    style={
                      this.state.presentPressed.includes(index)
                        ? [styles.present, { backgroundColor: 'green' }]
                        : styles.present
                    }
                    onPress={() => {
                      var presentPressed = this.state.presentPressed;
                      presentPressed.push(index);
                      this.setState({ presentPressed: presentPressed });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={
                      this.state.absentPressed.includes(index)
                        ? [styles.absent, { backgroundColor: 'red' }]
                        : styles.absent
                    }
                    onPress={() => {
                      var absentPressed = this.state.absentPressed;
                      absentPressed.push(index);
                      this.setState({ absentPressed: absentPressed });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>

        );
       }      
     }
  }

  const styles = StyleSheet.create({
    list: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },

  present: {
    width:80,
    height:30,
    marginRight:10,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'black',
  },

  absent: {
    width:80,
    height:30,
    marginRight:10,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'black',
  },

  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginTop:10,
    fill: 'white',
    borderWidth: 4,
    borderColor: 'black',
  }
});



import {Button, StyleSheet,Platform, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

const App = () => {
  // useEffect(() => {
  //   Contacts.getAll().then(contacts => {
  //     console.log(contacts);
  //   });
  // }, []);
  const permissionTexts = {
    title: 'Contacts',
    message:
      'Drives would like to access your contacts so you can invite, play and chat with friends',
    buttonPositive: 'Please accept bare mortal',
  };
  const getDeviceContacts = async () => {
    try {
      if (Platform.OS === 'ios') {
        return await Contacts.getAll()
        .then(async contacts => {
          if (contacts) {
            console.log(contacts);
            // let filterData = _.sortBy(contacts, 'displayName');
            // return filterData;
          }
        })
        .catch(error => {
          console.error(error);
        });
      } else if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          permissionTexts,
          );
          console.log(permission);
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          return await Contacts.getAll()
            .then(async contacts => {
              if (contacts) {
                console.log(contacts);
                // let filterData = _.sortBy(contacts, 'displayName');
                // return filterData;
              }
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          return [];
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>contacts</Text>
      <Button onPress={getDeviceContacts} title="Get Contacts" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

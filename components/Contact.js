import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Icon } from "@rneui/themed";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts(sortedContacts);
      }
    })();
  }, []);

  const handleSendMessage = (phoneNumbers) => {
    if (phoneNumbers && phoneNumbers.length > 0) {
      const phoneNumber = phoneNumbers[0].number;
      console.log("Opening Messages with number:", phoneNumber);
      const message = encodeURIComponent("Bonjour, " + "\n" + "Votre ami(e) BeamerxGirl est inscrit sur le site BetaSeries et souhaite vous le faire découvrir." + "\n" + "https://www.betaseries.com/");
      Linking.openURL(`sms:${phoneNumber}&body=${message}`);
    } else {
      console.log("No phone numbers found for this contact.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Accéder aux contacts')}>
        <Text style={styles.buttonText}>Accéder aux contacts</Text>
      </TouchableOpacity>

      <Text style={styles.titlePage}>Liste des contacts :</Text>
      <FlatList style={styles.friendsList}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItemContainer}>
            <Text style={styles.contactItem}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleSendMessage(item.phoneNumbers)}>
                <Icon name='ios-add' type='ionicon' size={24} reverse color={"#ff6f00"} />
              </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  button: {
    backgroundColor: '#ff6f00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  titlePage: {
    color: '#ff6f00',
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  
  friendsList: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: "#3d3d3d",
    borderRadius: 5,
    marginBottom: 20,
  },

  contactItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactItem: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ContactList;
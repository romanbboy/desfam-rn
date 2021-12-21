import React, {useState} from 'react'
import {Dimensions, Image, Pressable, View} from "react-native";
import {Avatar, Modal} from "@ui-kitten/components";

const Picshow = ({source, styles, avatarStyles}) => {
  const [modal, setModal] = useState(false);

  const dimensions = Dimensions.get('window');

  return (
    <View style={styles}>
      <Pressable onPress={() => setModal(true)}>
        <Avatar size='giant' source={source} style={avatarStyles} />
      </Pressable>

      <Modal
        visible={modal}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
        style={{width: '100%'}}
        onBackdropPress={() => setModal(false)}>
          <Image source={source} style={{ width: dimensions.width, height: dimensions.height / 2}}/>
      </Modal>
    </View>
  )
};

export default Picshow

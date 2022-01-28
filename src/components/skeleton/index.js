import React from 'react'
import SkeletonContent from "react-native-skeleton-content";
import Container from "../container";
import {View} from "react-native";
import {THEME} from "../../styles";

export const SkeletonList = () => {
  return (
    <Container>
      <SkeletonContent
        containerStyle={{ flex: 1, width: '100%' }}
        isLoading={true}
        boneColor='#e9ecef'
        layout={[
          { width: '50%', height: 28, marginBottom: 20 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 }
        ]}
      />
    </Container>
  )
}

export const SkeletonList2 = () => {
  return (
    <View>
      <SkeletonContent
        containerStyle={{ flex: 1, width: '100%' }}
        isLoading={true}
        boneColor={THEME.GRAY_COLOR}
        layout={[
          {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 23,
            children: [
              {width: "49%", height: 20, marginRight: 10},
              {width: 35, height: 35, borderRadius: 30, marginRight: 14}
            ]
          },
          { width: '100%', height: 20, marginBottom: 10, backgroundColor: THEME.GREEN_SUCCESS },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10, backgroundColor: THEME.GREEN_SUCCESS },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
          { width: '100%', height: 20, marginBottom: 10 },
        ]}
      />
    </View>
  )
}


export const SkeletonNotepad = () => {
  return (
    <Container>
      <SkeletonContent
        containerStyle={{ flex: 1, width: '100%' }}
        isLoading={true}
        boneColor='#e9ecef'
        layout={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 23,
            children: [
              {width: 56, height: 56, borderRadius: 30},
              {width: "70%", height: 30}
            ]
          },
          {width: "100%", height: 20, marginBottom: 10},
          {width: "100%", height: 20, marginBottom: 10},
          {width: "100%", height: 20, marginBottom: 10}
        ]}
      />
    </Container>
  )
}

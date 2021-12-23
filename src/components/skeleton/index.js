import React from 'react'
import SkeletonContent from "react-native-skeleton-content";
import Container from "../container";

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

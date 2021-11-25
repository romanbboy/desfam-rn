import React from 'react';
import {MyText} from '../../components/typography'
import Wrapper from "../../components/wrapper";
import Container from "../../components/container";

const HomeScreen = ({navigation}) => {
  return (
    <Wrapper>
      <Container>
        <MyText style={{textAlign: 'center'}}>Войди или зарегистируйся для того, что бы создать задачник</MyText>
      </Container>
    </Wrapper>
  );
}

export default HomeScreen

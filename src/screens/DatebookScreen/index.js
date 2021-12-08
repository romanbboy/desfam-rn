import React from 'react';

import Wrapper from "../../components/wrapper";
import Container from "../../components/container";
import {H1Text} from "../../components/typography";

const DatebookScreen = ({navigation}) => {

  return (
    <Wrapper>
      <Container>
        <H1Text type="h1">Задачник</H1Text>

      </Container>
    </Wrapper>
  );
}

export default DatebookScreen

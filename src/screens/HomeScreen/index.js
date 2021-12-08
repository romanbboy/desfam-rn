import React, {useEffect, useState} from 'react';
import * as Styled from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Wrapper from "../../components/wrapper";
import {MyText} from "../../components/typography";
import Container from "../../components/container";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import {MyButtonTiny} from "../../components/elements";
import {AddNewDatebook} from "../../components/add-new-datebook";
import {ScrollView, View} from "react-native";
import actions from "../../store/actions";
import ListDatebooks from "../../components/list-datebooks";

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const datebooks = useSelector(state => state.main.datebookList);

  const [showAddNewDatebook, setShowAddNewDatebook] = useState(false);

  useEffect(() => {
    if (currentUser) dispatch(actions.getAllDatebooks())
  }, [currentUser]);

  return (
    <ScrollView>
      <Wrapper>
        {currentUser && <>
          {!showAddNewDatebook && <Styled.MainActions>
            <Styled.MainAction>
              <MyText style={{fontFamily: 'open-semibold', marginRight: 8, lineHeight: 0}}>Добавить новый задачник</MyText>
              <MyButtonTiny onPress={() => setShowAddNewDatebook(true)}>
                <Icon name='plus-square' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
              </MyButtonTiny>
            </Styled.MainAction>
          </Styled.MainActions>}

          {showAddNewDatebook && <AddNewDatebook onClose={() => setShowAddNewDatebook(false)} />}

          <View>
            {!!datebooks.length && <ListDatebooks datebooks={datebooks} user={currentUser} />}
            {!datebooks.length && <Container>
              <MyText style={{textAlign: 'center'}}>Тут появится список ваших задачников</MyText>
            </Container>}
          </View>
        </>}

        {!currentUser && <Container>
          <MyText style={{textAlign: 'center'}}>Войди или зарегистируйся для того, что бы создать задачник</MyText>
        </Container>}

      </Wrapper>
    </ScrollView>
  )
}

export default HomeScreen;

import React, {useState} from 'react';
import * as Styled from './styles';
import {useSelector} from 'react-redux';
import Wrapper from "../../components/wrapper";
import {MyText} from "../../components/typography";
import Container from "../../components/container";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import {MyButtonTiny} from "../../components/elements";
import {AddNewDatebook} from "../../components/add-new-datebook";

const HomeScreen = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  // const datebooks = useSelector(state => state.main.datebookList);

  const [showAddNewDatebook, setShowAddNewDatebook] = useState(false);

  // useEffect(() => {
  //   if (currentUser) dispatch(actions.getAllDatebooks())
  // }, [currentUser]);

  return (
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

        {/*<Container>
          {!!datebooks.length && <ListDatebooks datebooks={datebooks} />}*!/
          {!datebooks.length && <p style={{textAlign: 'center'}}>Тут появится список ваших задачников</p>}
        </Container>*/}
      </>}

      {!currentUser && <Container>
        <MyText style={{textAlign: 'center'}}>Войди или зарегистируйся для того, что бы создать задачник</MyText>
      </Container>}

    </Wrapper>
  )
}

export default HomeScreen;

import React, {useContext} from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from '../../../src/app/stores/activityStore'
import { observer } from "mobx-react-lite";



const Navbar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
        <Container>
      <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Reactivites
      </Menu.Item>
      <Menu.Item name="Activities" />
      <Menu.Item>
          <Button onClick={activityStore.openCreateForm} positive content="Create Activity" />
          </Menu.Item> 
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
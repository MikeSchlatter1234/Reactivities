import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProfileEdit from "./ProfileEdit";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    editProfile,
  } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header
            floated="left"
            icon="address card outline"
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEdit editProfile={editProfile} profile={profile!} />
          ) : (
            <Grid>
              <Grid.Column width={16}>{profile?.bio}</Grid.Column>
            </Grid>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);

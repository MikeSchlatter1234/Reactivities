import React from "react";
import {  Grid, Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { IProfile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

interface IProps {
  editProfile: (profile: Partial<IProfile>) => void;
  profile: IProfile;
}

const ProfileEdit: React.FC<IProps> = ({ profile, editProfile }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <FinalForm
          validate={validate}
          initialValues={profile}
          onSubmit={editProfile}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                placeholder="Display Name"
                value={profile.displayName}
                name="displayName"
                title="fieldtitle"
                component={TextInput}
              />
              <Field
                rows={3}
                placeholder="Bio"
                value={profile.bio}
                name="bio"
                component={TextAreaInput}
              />
              <Button
                //   loading={submitting}
                disabled={invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
            </Form>
          )}
        />
        {/* </Segment> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfileEdit);

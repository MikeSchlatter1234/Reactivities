import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {ActivityFormValues} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate'
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});


interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(
          (activity) =>
            activity && setActivity(new ActivityFormValues(activity))
        )
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndtime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndtime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  value={activity.title}
                  name="title"
                  title="fieldtitle"
                  component={TextInput}
                />
                <Field
                  rows={3}
                  placeholder="Description"
                  value={activity.description}
                  name="description"
                  component={TextAreaInput}
                />
                <Field
                  placeholder="Category"
                  options={category}
                  value={activity.category}
                  name="category"
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    placeholder="Date"
                    value={activity.date}
                    name="date"
                    date={true}
                  />
                  <Field
                    component={DateInput}
                    placeholder="Time"
                    value={activity.time}
                    name="time"
                    time={true}
                  />
                </Form.Group>
                <Field
                  placeholder="City"
                  value={activity.city}
                  name="city"
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  value={activity.venue}
                  name="venue"
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={activity.id ? () => history.push(`/activities/${activity.id}`):() => history.push("/activities")}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);

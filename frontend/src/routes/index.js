import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import RegisterStudent from '~/pages/RegisterStudent';
import EditStudent from '~/pages/EditStudent';

import Plans from '~/pages/Plans';
import RegisterPlan from '~/pages/RegisterPlan';
import EditPlan from '~/pages/EditPlan';

import Enrollments from '~/pages/Enrollments';
import EditEnrollment from '~/pages/EditEnrollment';
import RegisterEnrollment from '~/pages/RegisterEnrollment';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />

      <Route path="/students" component={Students} isPrivate exact />
      <Route path="/students/:id" component={EditStudent} isPrivate exact />
      <Route path="/register-student" component={RegisterStudent} isPrivate />

      <Route path="/plans" component={Plans} isPrivate exact />
      <Route path="/plans/:id" component={EditPlan} isPrivate exact />
      <Route path="/register-plan" component={RegisterPlan} isPrivate />

      <Route path="/enrollments" component={Enrollments} isPrivate exact />
      <Route
        path="/enrollments/:id"
        component={EditEnrollment}
        isPrivate
        exact
      />
      <Route
        path="/register-enrollment"
        component={RegisterEnrollment}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}

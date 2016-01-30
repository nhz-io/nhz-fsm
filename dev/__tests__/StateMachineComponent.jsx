jest.dontMock('../StateMachineComponent.jsx')
import React from 'react';
import TestUtils from 'react-addons-test-utils';
const StateMachineComponent = require('../StateMachineComponent.jsx').default;

describe('example', function() {
  it('should be a Component', function() {
    TestUtils.renderIntoDocument(<StateMachineComponent/>);
  });
});

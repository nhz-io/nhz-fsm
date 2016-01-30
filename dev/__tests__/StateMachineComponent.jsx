jest.dontMock('../StateMachineComponent.jsx');
jest.dontMock('jsx-selectable-container-enhance');
jest.dontMock('jsx-base');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
const StateMachineComponent = require('../StateMachineComponent.jsx').default; // This hack is to import ES6

describe('example', function() {
  it('should be a Component', function() {
    TestUtils.renderIntoDocument(<StateMachineComponent/>);
  });
});

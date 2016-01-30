import React from 'react';

export default class Base extends React.Component {
  bindHandlers(pattern, prototype) {
    Object
      .getOwnPropertyNames(prototype)
      .forEach((key) => {
        if(key.match(pattern)) {
          this[key] = this[key].bind(this)
        }
      });

    return this;
  }
}

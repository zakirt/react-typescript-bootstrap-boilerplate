import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../src/components/App';

jest.mock('../src/scss/main.scss', () => () => 'SomeComponent');

describe('App', () => {
    let app;

    beforeEach(() => {
        app = shallow(<App />);
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });
});

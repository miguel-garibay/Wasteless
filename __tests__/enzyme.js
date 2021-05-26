<<<<<<< HEAD
import { React } from 'react';
import {configure, shallow } from 'enzyme';
=======
import React from 'react';
import {configure, shallow, mount } from 'enzyme';
>>>>>>> c7de8cf8c1cfe777db063e885fc5cc4fd5134635
import DisposedList from '../components/DisposedList'
import DisposedItem from '../components/DisposedItem'
import { Food } from '../server/FoodModel'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import server from '../server/server';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
    describe('DisposedItem', () => {
        let wrapper;
        const props = {
            id: 1,
            itemName: 'apples',
        };

        beforeAll( () => {
            wrapper = shallow(<DisposedItem { ...props } />)
        });

        // afterEach(async () => {
        //     await server.close();
        // })

        it('Should render text of Disposed List', () => {
            expect(wrapper.text()).toEqual('1. apples  ');
        })
        it('Should be wrapped in a div', ()=>{
           expect(wrapper.type()).toEqual('div');
        })
        it('Should be wrapped in <span>', ()=>{
           expect(wrapper.find('span').hasClass('items')).toBe(true);
        })
<<<<<<< HEAD
        it('Checking if h3 works with .type or if .type only works with outer wrapper. Pass=yes, fail=only wrap', ()=>{
         expect(wrapper.type()).toEqual('h3');
      })
=======
        it('Should have a nested div', ()=>{
            expect(wrapper.find('div').at(1).hasClass('outcomesListBtnContainer')).toBe(true);
         })
>>>>>>> c7de8cf8c1cfe777db063e885fc5cc4fd5134635
      
    //   afterAll(async done => {
    //     Food.disconnect();
    //     server.close();
    //     done();
    //   }) 
    });
});

    // describe('DisposedList', () => {

    //   let wrapper;
//     })


// })
//check for an h3 test
//array of all component items inside a div//array of all component items inside a div
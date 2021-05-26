import React from 'react';
import {configure, shallow, mount } from 'enzyme';
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
        it('Should have a nested div', ()=>{
            expect(wrapper.find('div').at(1).hasClass('outcomesListBtnContainer')).toBe(true);
         })
      
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
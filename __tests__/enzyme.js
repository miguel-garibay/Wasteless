import { React } from 'react';
import {configure, shallow, mount } from 'enzyme';
import DisposedList from '../components/DisposedList'
// import DisposedItem from '../components/DisposedItem'
import { Food } from '../server/FoodModel'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import server from '../server/server';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
    describe('DisposedList', () => {
        let wrapper;
        const props = {
            id: 1,
            itemName: 'apples',
        };

        beforeAll( () => {
            wrapper = shallow(<DisposedList { ...props } />)
        });

        it('Should render text of Disposed List', () => {
            expect(wrapper.text()).toEqual('Disposed List');
        })
        it('Should be wrapped in a div', ()=>{
           expect(wrapper.type()).toEqual('div')
        })
        it('Should be wrapped in <h3>', ()=>{
           expect(wrapper.find()).toEqual('h3')
        })
        it('Checking if h3 works with .type or if .type only works with outer wrapper. Pass=yes, fail=only wrap', ()=>{
           expect(wrapper.type()).toEqual('h3');
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
import React from 'react';
import MapContainer from './MapContainer';
import { mount } from 'enzyme';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GoogleMapReact from 'google-map-react';

configure({ adapter: new Adapter() });

const mockDatasmall = [
  {
    label: 'Car1',
    imgSrc: 'https://img.icons8.com/color/48/000000/car.png',
    location: {
      lat: 32.053199699999996,
      lng: 34.7650957,
    }
  },
  {
    label: 'Car2',
    imgSrc: 'https://img.icons8.com/cotton/64/000000/car.png',
    location: {
      lat: 32.055199699999996,
      lng: 34.7620957,
    }
  },
  {
    label: 'Car3',
    imgSrc: 'https://img.icons8.com/color/48/000000/f1-race-car-side-view.png',
    location: {
      lat: 32.055899699999996,
      lng: 34.7690957,
    }
  }
];

const lat = 32;
const lng = 32;

describe('<MapContainer />', () => {
  it('accepts lat prop', () => {
    const wrapper = mount(<MapContainer lat={lat} lng={lng} data={[]} setData={() => {}}/>);
    expect(wrapper.props().lat).toEqual(lat);
    expect(wrapper.props().lng).toEqual(lng);
  });
});

describe('<MapContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MapContainer MapContainer lat={lat} lng={lng} data={[]} setData={() => {}}/>);
  });

  it('should render <GoogleMapReact /> when receiving data', () => {
    wrapper.setProps({ data: mockDatasmall });
    expect(wrapper.find(GoogleMapReact)).toHaveLength(1);
  });
});

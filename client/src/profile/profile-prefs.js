import React, { Component } from 'react';
import { Slider, Select, Radio, Input, InputNumber } from 'antd';
import prefs from './interests';
import './profile-prefs.css';
const Option = Select.Option;
const RadioGroup = Radio.Group;

class ProfilePrefs extends Component {
  constructor(props) {
    super(props);
  }

  interests = () => {
    return prefs.map((e, i) => {
      return (
        <Option key={i} value={e}>
          {e}
        </Option>
      );
    });
  };

  onChange = e => {
    console.log(e.target);
  };

  handleChange = value => {
    console.log(`Selected: ${value}`);
  };
  render() {
    var responseOnUrl = 'Prefer not to say';

    const { getFieldDecorator } = this.props.form;
    const FormItem = this.props.FormItem;
    return (
      <div>
        <FormItem label={'Interest'}>
          {getFieldDecorator('interest', {})(
            <Select
              mode="tags"
              placeholder="Please select your interests"
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {this.interests()}
            </Select>
          )}
        </FormItem>
        <FormItem label={'You identify as'}>
          {getFieldDecorator('identifyAs', {})(
            <RadioGroup>
              <Radio value="n/a">{responseOnUrl}</Radio>
              <Radio value="straight">Straight</Radio>
              <Radio value="gay">Gay</Radio>
              <Radio value="bisexual">Bisexual</Radio>
              <Radio value="other">Other</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label={'Age Range'}>
          {getFieldDecorator('ageRange', {
            initialValue: [20, 50],
          })(<Slider range />)}
        </FormItem>
        <FormItem label={'Girls'}>
          {getFieldDecorator('girls', {})(
            <div>
              <InputNumber />
            </div>
          )}
        </FormItem>
        <FormItem label={'Boys'}>
          {getFieldDecorator('boys', {})(
            <div>
              <InputNumber />
            </div>
          )}
        </FormItem>

        <FormItem label={'Smoker'}>
          {getFieldDecorator('smoker', {})(
            <RadioGroup>
              <Radio value="n/a">{responseOnUrl}</Radio>
              <Radio value="yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label={'Drinker'}>
          {getFieldDecorator('drinker', {})(
            <RadioGroup>
              <Radio value="n/a">{responseOnUrl}</Radio>
              <Radio value="yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </div>
    );
  }
}
export default ProfilePrefs;

import React from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';

export default function Button({ label, type, ...rest }) {
  return (
    <CustomButton type={type} form={rest.form}>
      <MdDone size={20} color={rest.color} />
      {label}
    </CustomButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  label: '',
  type: '',
};

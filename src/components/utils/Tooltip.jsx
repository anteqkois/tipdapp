import React from 'react';
import TooltipUI from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const Tooltip = ({ children, content, placement = 'left' }) => {
  return content ? (
    <TooltipUI overlay={<span>{content}</span>} placement={placement} mouseEnterDelay={0.3}>
      {children}
    </TooltipUI>
  ) : (
    { children }
  );
};

export default Tooltip;

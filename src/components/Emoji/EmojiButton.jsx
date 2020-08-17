import React from "react";
import styled from "styled-components";

const AriaDiv = ({ className, children, onClick, onKeyDown }) => {
    return (
        <div
            role="button"
            aria-pressed="false"
            tabIndex="0"
            className={className}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            {children}
        </div>
    );
};

const EmojiButton = styled(AriaDiv)`
grid-column: ${props => props.startl ? props.startl : 'auto'} / ${props => props.endl ? props.endl : 'auto'};
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
  user-select: none;
  cursor: pointer;

    span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }

    @media ${props => props.theme.breakpoints.m} {
        grid-column: ${props => props.startm ? props.startm : 'auto'} / ${props => props.endm ? props.endm : 'auto'};

  }

  @media ${props => props.theme.breakpoints.s} {
    grid-column: ${props => props.starts ? props.starts : 'auto'} / ${props => props.ends ? props.ends : 'auto'};
  }

`;

export default EmojiButton;

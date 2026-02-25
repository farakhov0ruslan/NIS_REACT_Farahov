import styled from 'styled-components';

interface ActionButtonProps {
  variant: 'feed' | 'levelUp' | 'cheer' | 'reset';
}

const variantStyles = {
  feed: {
    background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    hoverBackground: 'linear-gradient(135deg, #00e4ff 0%, #00aaff 100%)',
    shadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
    hoverShadow: '0 6px 20px rgba(0, 212, 255, 0.6)',
  },
  levelUp: {
    background: 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)',
    hoverBackground: 'linear-gradient(135deg, #ff33ff 0%, #dd00dd 100%)',
    shadow: '0 4px 15px rgba(255, 0, 255, 0.4)',
    hoverShadow: '0 6px 20px rgba(255, 0, 255, 0.6)',
  },
  cheer: {
    background: 'linear-gradient(135deg, #ffff00 0%, #ffcc00 100%)',
    hoverBackground: 'linear-gradient(135deg, #ffff33 0%, #ffdd00 100%)',
    shadow: '0 4px 15px rgba(255, 255, 0, 0.4)',
    hoverShadow: '0 6px 20px rgba(255, 255, 0, 0.6)',
  },
  reset: {
    background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
    hoverBackground: 'linear-gradient(135deg, #ff5555 0%, #dd0000 100%)',
    shadow: '0 4px 15px rgba(255, 68, 68, 0.4)',
    hoverShadow: '0 6px 20px rgba(255, 68, 68, 0.6)',
  },
};

export const ActionButton = styled.button<ActionButtonProps>`
  position: relative;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.variant === 'cheer' ? '#000' : '#fff')};
  background: ${(props) => variantStyles[props.variant].background};
  box-shadow: ${(props) => variantStyles[props.variant].shadow};
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    background: ${(props) => variantStyles[props.variant].hoverBackground};
    box-shadow: ${(props) => variantStyles[props.variant].hoverShadow};
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${(props) => variantStyles[props.variant].shadow};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(50%);
  }

  &:focus-visible {
    outline: 2px solid #00ffff;
    outline-offset: 2px;
  }
`;

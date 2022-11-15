export interface IProps {
  fill?: string;
  showHover?: boolean;
  onClick?: () => void;
}
export const CheckboxCheckedIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={props.showHover ? 'showPointerOnHover' : ''}
      xmlns='http://www.w3.org/2000/svg'
      onClick={props.onClick}
    >
      <g clip-path='url(#clip0_226_13380)'>
        <path
          d='M15.8333 0H4.16668C1.86664 0.00277344 0.00277344 1.86664 0 4.16668V15.8334C0.00277344 18.1334 1.86664 19.9973 4.16668 20H15.8334C18.1334 19.9973 19.9973 18.1334 20 15.8333V4.16668C19.9973 1.86664 18.1334 0.00277344 15.8333 0ZM16.6667 6.7325L8.955 14.4442C8.30426 15.0952 7.24898 15.0954 6.59797 14.4446C6.59781 14.4445 6.59766 14.4443 6.5975 14.4442L3.33332 11.1809C3.00723 10.8548 3.00723 10.3261 3.33332 10C3.65941 9.67398 4.18809 9.67395 4.51414 10L7.77746 13.2634L15.49 5.55168C15.8161 5.22676 16.3438 5.22769 16.6687 5.55375C16.9937 5.87984 16.9927 6.40758 16.6667 6.7325Z'
          fill={props.fill ?? '#172A3A'}
        />
      </g>
      <defs>
        <clipPath id='clip0_226_13380'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

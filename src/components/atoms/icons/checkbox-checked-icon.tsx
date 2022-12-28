export interface IProps {
  fill?: string;
  showHover?: boolean;
  onClick?: () => void;
}

export const CheckboxCheckedIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      onClick={props.onClick}
      className={props.showHover ? 'showPointerOnHover' : ''}
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_650_7177)'>
        <path
          d='M12.6667 0.5H3.33334C1.49331 0.502219 0.00221875 1.99331 0 3.83334V13.1667C0.00221875 15.0067 1.49331 16.4978 3.33334 16.5H12.6667C14.5067 16.4978 15.9978 15.0067 16 13.1667V3.83334C15.9978 1.99331 14.5067 0.502219 12.6667 0.5ZM13.3333 5.886L7.164 12.0553C6.64341 12.5762 5.79919 12.5763 5.27838 12.0557C5.27825 12.0556 5.27812 12.0555 5.278 12.0553L2.66666 9.44469C2.40578 9.18381 2.40578 8.76088 2.66666 8.50003C2.92753 8.23919 3.35047 8.23916 3.61131 8.50003L6.22197 11.1107L12.392 4.94134C12.6528 4.68141 13.075 4.68216 13.335 4.943C13.5949 5.20387 13.5942 5.62606 13.3333 5.886Z'
          fill={props.fill ?? '#09BC8A'}
        />
      </g>
      <defs>
        <clipPath id='clip0_650_7177'>
          <rect
            width='16'
            height='16'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

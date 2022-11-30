export interface IProps {
  fill?: string;
  showHover?: boolean;
  onClick?: () => void;
}
export const ListIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      className={props.showHover ? 'showPointerOnHover' : ''}
      onClick={props.onClick}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_417_5569)'>
        <path
          d='M7 6H23C23.2652 6 23.5196 5.89464 23.7071 5.7071C23.8946 5.51957 24 5.26521 24 5C24 4.73478 23.8946 4.48043 23.7071 4.29289C23.5196 4.10536 23.2652 4 23 4H7C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5C6 5.26521 6.10536 5.51957 6.29289 5.7071C6.48043 5.89464 6.73478 6 7 6Z'
          fill={props.fill ?? 'white'}
        />
        <path
          d='M23 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8947 6.73478 13 7 13H23C23.2652 13 23.5196 12.8947 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11Z'
          fill={props.fill ?? 'white'}
        />
        <path
          d='M23 18H7C6.73478 18 6.48043 18.1054 6.29289 18.2929C6.10536 18.4804 6 18.7348 6 19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8947 6.73478 20 7 20H23C23.2652 20 23.5196 19.8947 23.7071 19.7071C23.8946 19.5196 24 19.2652 24 19C24 18.7348 23.8946 18.4804 23.7071 18.2929C23.5196 18.1054 23.2652 18 23 18Z'
          fill={props.fill ?? 'white'}
        />
        <path
          d='M2 6.99999C3.10457 6.99999 4 6.10456 4 5C4 3.89543 3.10457 3 2 3C0.89543 3 0 3.89543 0 5C0 6.10456 0.89543 6.99999 2 6.99999Z'
          fill={props.fill ?? 'white'}
        />
        <path
          d='M2 14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10C0.89543 10 0 10.8954 0 12C0 13.1046 0.89543 14 2 14Z'
          fill={props.fill ?? 'white'}
        />
        <path
          d='M2 21C3.10457 21 4 20.1046 4 19C4 17.8954 3.10457 17 2 17C0.89543 17 0 17.8954 0 19C0 20.1046 0.89543 21 2 21Z'
          fill={props.fill ?? 'white'}
        />
      </g>
      <defs>
        <clipPath id='clip0_417_5569'>
          <rect width='24' height='24' fill={props.fill ?? 'white'} />
        </clipPath>
      </defs>
    </svg>
  );
};

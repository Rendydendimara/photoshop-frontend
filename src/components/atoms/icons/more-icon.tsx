export interface IProps {
  fill?: string;
  showHover?: boolean;
  onClick?: () => void;
}
export const MoreIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      className={props.showHover ? 'showPointerOnHover' : ''}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={props.onClick}
    >
      <path
        d='M2.00002 14C3.10459 14 4.00003 13.1046 4.00003 12C4.00003 10.8954 3.10459 10 2.00002 10C0.895438 10 0 10.8954 0 12C0 13.1046 0.895438 14 2.00002 14Z'
        fill={props.fill ?? '#8FA2B1'}
      />
      <path
        d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
        fill={props.fill ?? '#8FA2B1'}
      />
      <path
        d='M22 14C23.1046 14 24.0001 13.1046 24.0001 12C24.0001 10.8954 23.1046 10 22 10C20.8954 10 20 10.8954 20 12C20 13.1046 20.8954 14 22 14Z'
        fill={props.fill ?? '#8FA2B1'}
      />
    </svg>
  );
};

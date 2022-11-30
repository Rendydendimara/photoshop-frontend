export interface IProps {
  fill?: string;
  showHover?: boolean;
  onClick?: () => void;
}
export const RemoveIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      width='16'
      className={props.showHover ? 'showPointerOnHover' : ''}
      onClick={props.onClick}
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_417_5575)'>
        <path
          d='M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9952 3.58369 12.4163 0.00478125 8 0ZM10.6667 9.72466C10.9376 9.974 10.9551 10.3958 10.7057 10.6667C10.4564 10.9376 10.0346 10.9551 9.76372 10.7057C9.75016 10.6933 9.73716 10.6802 9.72466 10.6667L8 8.94266L6.276 10.6667C6.01116 10.9224 5.58913 10.9151 5.33334 10.6503C5.08384 10.3919 5.08384 9.98234 5.33334 9.724L7.05734 8L5.33334 6.276C5.07756 6.01116 5.08491 5.58913 5.34975 5.33334C5.60809 5.08384 6.01766 5.08384 6.276 5.33334L8 7.05734L9.72466 5.33334C9.974 5.06244 10.3958 5.04494 10.6667 5.29428C10.9376 5.54363 10.9551 5.96537 10.7057 6.23628C10.6933 6.24984 10.6802 6.26284 10.6667 6.27534L8.94266 8L10.6667 9.72466Z'
          fill={props.fill ?? '#FF4778'}
        />
      </g>
      <defs>
        <clipPath id='clip0_417_5575'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

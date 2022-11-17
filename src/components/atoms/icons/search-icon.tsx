export interface IProps {
  fill?: string;
  onClick?: () => void;
  showHover?: boolean;
}
export const SearchIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      className={props.showHover ? 'showPointerOnHover' : ''}
      width='14'
      height='15'
      viewBox='0 0 14 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={props.onClick}
    >
      <g clip-path='url(#clip0_344_3237)'>
        <path
          d='M13.829 13.5044L10.347 10.0225C11.2959 8.86197 11.7624 7.38117 11.6501 5.88636C11.5378 4.39155 10.8552 2.99709 9.74363 1.99142C8.63202 0.985748 7.17638 0.445804 5.67783 0.483273C4.17928 0.520741 2.75245 1.13276 1.69248 2.19272C0.632511 3.25269 0.0204971 4.67952 -0.0169715 6.17807C-0.05444 7.67663 0.485504 9.13226 1.49118 10.2439C2.49685 11.3555 3.89131 12.038 5.38612 12.1504C6.88093 12.2627 8.36172 11.7961 9.52221 10.8473L13.0041 14.3292C13.1141 14.4355 13.2615 14.4943 13.4144 14.4929C13.5674 14.4916 13.7137 14.4303 13.8219 14.3221C13.93 14.2139 13.9914 14.0676 13.9927 13.9147C13.994 13.7617 13.9352 13.6144 13.829 13.5044ZM5.83321 11.0001C4.91023 11.0001 4.00797 10.7264 3.24055 10.2136C2.47312 9.70086 1.87498 8.97203 1.52177 8.11931C1.16856 7.26658 1.07614 6.32827 1.25621 5.42303C1.43627 4.51778 1.88073 3.68626 2.53337 3.03362C3.18602 2.38097 4.01754 1.93652 4.92278 1.75645C5.82803 1.57639 6.76634 1.6688 7.61906 2.02201C8.47178 2.37522 9.20062 2.97336 9.7134 3.74079C10.2262 4.50822 10.4999 5.41047 10.4999 6.33345C10.4985 7.5707 10.0064 8.75688 9.1315 9.63175C8.25663 10.5066 7.07046 10.9987 5.83321 11.0001Z'
          fill={props.fill ?? '#B4C6D5'}
        />
      </g>
      <defs>
        <clipPath id='clip0_344_3237'>
          <rect
            width='14'
            height='14'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

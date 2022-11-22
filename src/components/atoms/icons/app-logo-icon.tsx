export interface IProps {
  fill?: string;
  onClick?: () => void;
  showHover?: boolean;
}
export const AppLogoIcon: React.FC<IProps> = (props) => {
  return (
    <svg
      width='190'
      height='29'
      viewBox='0 0 190 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={props.onClick}
      className={props.showHover ? 'showPointerOnHover' : ''}
    >
      <path
        d='M1.184 8.088C1.03467 7.85333 0.896 7.53333 0.768 7.128C0.64 6.72267 0.576 6.296 0.576 5.848C0.576 5.016 0.757333 4.41867 1.12 4.056C1.504 3.69333 1.99467 3.512 2.592 3.512H16.544C16.6933 3.74667 16.832 4.06667 16.96 4.472C17.088 4.87733 17.152 5.304 17.152 5.752C17.152 6.584 16.96 7.18133 16.576 7.544C16.2133 7.90667 15.7333 8.088 15.136 8.088H11.584V22.872C11.3493 22.936 10.976 23 10.464 23.064C9.97333 23.128 9.48267 23.16 8.992 23.16C8.50133 23.16 8.064 23.1173 7.68 23.032C7.31733 22.968 7.008 22.84 6.752 22.648C6.496 22.456 6.304 22.1893 6.176 21.848C6.048 21.5067 5.984 21.0587 5.984 20.504V8.088H1.184ZM34.8053 22.968C34.5919 23.032 34.2506 23.096 33.7812 23.16C33.3333 23.224 32.8639 23.256 32.3733 23.256C31.9039 23.256 31.4773 23.224 31.0933 23.16C30.7306 23.096 30.4213 22.968 30.1653 22.776C29.9093 22.584 29.7066 22.328 29.5573 22.008C29.4293 21.6667 29.3653 21.2293 29.3653 20.696V13.592C29.3653 12.7173 29.1413 12.1093 28.6933 11.768C28.2666 11.4053 27.7333 11.224 27.0933 11.224C26.6666 11.224 26.2613 11.2773 25.8773 11.384C25.4933 11.4907 25.1839 11.6187 24.9493 11.768V22.968C24.7359 23.032 24.3946 23.096 23.9253 23.16C23.4773 23.224 23.0079 23.256 22.5173 23.256C22.0479 23.256 21.6213 23.224 21.2373 23.16C20.8746 23.096 20.5653 22.968 20.3093 22.776C20.0533 22.584 19.8506 22.328 19.7013 22.008C19.5733 21.6667 19.5093 21.2293 19.5093 20.696V2.136C19.7439 2.09333 20.0853 2.04 20.5333 1.976C21.0026 1.89067 21.4719 1.848 21.9413 1.848C22.4106 1.848 22.8266 1.88 23.1893 1.944C23.5733 2.008 23.8933 2.136 24.1493 2.328C24.4053 2.52 24.5973 2.78667 24.7253 3.128C24.8746 3.448 24.9493 3.87467 24.9493 4.408V7.544C25.2266 7.43733 25.6426 7.32 26.1973 7.192C26.7733 7.04267 27.4026 6.968 28.0853 6.968C30.1973 6.968 31.8399 7.50133 33.0133 8.568C34.2079 9.61333 34.8053 11.1813 34.8053 13.272V22.968ZM46.388 23.512C45.1293 23.512 43.956 23.3413 42.868 23C41.8013 22.6373 40.8627 22.104 40.052 21.4C39.2627 20.696 38.6333 19.8107 38.164 18.744C37.716 17.6773 37.492 16.4293 37.492 15C37.492 13.592 37.716 12.3867 38.164 11.384C38.6333 10.36 39.2413 9.528 39.988 8.888C40.7347 8.22667 41.588 7.74667 42.548 7.448C43.508 7.128 44.4893 6.968 45.492 6.968C46.6227 6.968 47.6467 7.13867 48.564 7.48C49.5027 7.82133 50.3027 8.29067 50.964 8.888C51.6467 9.48533 52.1693 10.2 52.532 11.032C52.916 11.864 53.108 12.7707 53.108 13.752C53.108 14.4773 52.9053 15.032 52.5 15.416C52.0947 15.8 51.5293 16.0453 50.804 16.152L42.9 17.336C43.1347 18.04 43.6147 18.5733 44.34 18.936C45.0653 19.2773 45.8973 19.448 46.836 19.448C47.7107 19.448 48.532 19.3413 49.3 19.128C50.0893 18.8933 50.7293 18.6267 51.22 18.328C51.5613 18.5413 51.8493 18.84 52.084 19.224C52.3187 19.608 52.436 20.0133 52.436 20.44C52.436 21.4 51.988 22.1147 51.092 22.584C50.4093 22.9467 49.6413 23.192 48.788 23.32C47.9347 23.448 47.1347 23.512 46.388 23.512ZM45.492 10.936C44.98 10.936 44.532 11.0213 44.148 11.192C43.7853 11.3627 43.4867 11.5867 43.252 11.864C43.0173 12.12 42.836 12.4187 42.708 12.76C42.6013 13.08 42.5373 13.4107 42.516 13.752L47.988 12.856C47.924 12.4293 47.6893 12.0027 47.284 11.576C46.8787 11.1493 46.2813 10.936 45.492 10.936Z'
        fill='#172A3A'
      />
      <path
        d='M61.1665 17.656C61.1665 18.2107 61.3372 18.6053 61.6785 18.84C62.0412 19.0747 62.5425 19.192 63.1825 19.192C63.5025 19.192 63.8332 19.1707 64.1745 19.128C64.5158 19.064 64.8145 18.9893 65.0705 18.904C65.2625 19.1387 65.4225 19.4053 65.5505 19.704C65.6998 19.9813 65.7745 20.3227 65.7745 20.728C65.7745 21.5387 65.4652 22.2 64.8465 22.712C64.2492 23.224 63.1825 23.48 61.6465 23.48C59.7692 23.48 58.3185 23.0533 57.2945 22.2C56.2918 21.3467 55.7905 19.96 55.7905 18.04V4.344C56.0252 4.28 56.3558 4.216 56.7825 4.152C57.2305 4.06667 57.6998 4.024 58.1905 4.024C59.1292 4.024 59.8545 4.19467 60.3665 4.536C60.8998 4.856 61.1665 5.54933 61.1665 6.616V8.664H65.3585C65.4865 8.89867 65.6038 9.19733 65.7105 9.56C65.8385 9.90133 65.9025 10.2853 65.9025 10.712C65.9025 11.4587 65.7318 12.0027 65.3905 12.344C65.0705 12.664 64.6332 12.824 64.0785 12.824H61.1665V17.656ZM73.979 22.968C73.7657 23.032 73.4243 23.096 72.955 23.16C72.507 23.224 72.0377 23.256 71.547 23.256C71.0777 23.256 70.651 23.224 70.267 23.16C69.9043 23.096 69.595 22.968 69.339 22.776C69.083 22.584 68.8803 22.328 68.731 22.008C68.603 21.6667 68.539 21.2293 68.539 20.696V11.096C68.539 10.6053 68.6243 10.1893 68.795 9.848C68.987 9.48533 69.2537 9.16533 69.595 8.888C69.9363 8.61067 70.3523 8.36533 70.843 8.152C71.355 7.91733 71.899 7.71467 72.475 7.544C73.051 7.37333 73.6483 7.24533 74.267 7.16C74.8857 7.05333 75.5043 7 76.123 7C77.147 7 77.9577 7.20267 78.555 7.608C79.1523 7.992 79.451 8.632 79.451 9.528C79.451 9.82667 79.4083 10.1253 79.323 10.424C79.2377 10.7013 79.131 10.9573 79.003 11.192C78.555 11.192 78.0963 11.2133 77.627 11.256C77.1577 11.2987 76.699 11.3627 76.251 11.448C75.803 11.5333 75.3763 11.6293 74.971 11.736C74.587 11.8213 74.2563 11.928 73.979 12.056V22.968ZM81.6953 7.672C81.9086 7.608 82.2393 7.544 82.6873 7.48C83.1566 7.416 83.6366 7.384 84.1273 7.384C84.5966 7.384 85.0126 7.416 85.3753 7.48C85.7593 7.544 86.0793 7.672 86.3353 7.864C86.5913 8.056 86.7833 8.32267 86.9113 8.664C87.0606 8.984 87.1353 9.41067 87.1353 9.944V16.824C87.1353 17.6987 87.3486 18.328 87.7753 18.712C88.2019 19.0747 88.8206 19.256 89.6313 19.256C90.1219 19.256 90.5166 19.2133 90.8153 19.128C91.1353 19.0427 91.3806 18.9573 91.5513 18.872V7.672C91.7646 7.608 92.0953 7.544 92.5433 7.48C93.0126 7.416 93.4926 7.384 93.9833 7.384C94.4526 7.384 94.8686 7.416 95.2313 7.48C95.6153 7.544 95.9353 7.672 96.1912 7.864C96.4473 8.056 96.6393 8.32267 96.7673 8.664C96.9166 8.984 96.9913 9.41067 96.9913 9.944V19.672C96.9913 20.7387 96.5433 21.5387 95.6473 22.072C94.9006 22.5413 94.0046 22.8933 92.9593 23.128C91.9353 23.384 90.8153 23.512 89.5993 23.512C88.4473 23.512 87.3806 23.384 86.3993 23.128C85.4393 22.872 84.6073 22.4773 83.9033 21.944C83.1993 21.4107 82.6553 20.728 82.2713 19.896C81.8873 19.0427 81.6953 18.0187 81.6953 16.824V7.672ZM108.544 23.512C107.286 23.512 106.112 23.3413 105.024 23C103.958 22.6373 103.019 22.104 102.208 21.4C101.419 20.696 100.79 19.8107 100.32 18.744C99.8723 17.6773 99.6483 16.4293 99.6483 15C99.6483 13.592 99.8723 12.3867 100.32 11.384C100.79 10.36 101.398 9.528 102.144 8.888C102.891 8.22667 103.744 7.74667 104.704 7.448C105.664 7.128 106.646 6.968 107.648 6.968C108.779 6.968 109.803 7.13867 110.72 7.48C111.659 7.82133 112.459 8.29067 113.12 8.888C113.803 9.48533 114.326 10.2 114.688 11.032C115.072 11.864 115.264 12.7707 115.264 13.752C115.264 14.4773 115.062 15.032 114.656 15.416C114.251 15.8 113.686 16.0453 112.96 16.152L105.056 17.336C105.291 18.04 105.771 18.5733 106.496 18.936C107.222 19.2773 108.054 19.448 108.992 19.448C109.867 19.448 110.688 19.3413 111.456 19.128C112.246 18.8933 112.886 18.6267 113.376 18.328C113.718 18.5413 114.006 18.84 114.24 19.224C114.475 19.608 114.592 20.0133 114.592 20.44C114.592 21.4 114.144 22.1147 113.248 22.584C112.566 22.9467 111.798 23.192 110.944 23.32C110.091 23.448 109.291 23.512 108.544 23.512ZM107.648 10.936C107.136 10.936 106.688 11.0213 106.304 11.192C105.942 11.3627 105.643 11.5867 105.408 11.864C105.174 12.12 104.992 12.4187 104.864 12.76C104.758 13.08 104.694 13.4107 104.672 13.752L110.144 12.856C110.08 12.4293 109.846 12.0027 109.44 11.576C109.035 11.1493 108.438 10.936 107.648 10.936ZM131.003 18.36C131.003 19.9813 130.395 21.2507 129.179 22.168C127.963 23.0853 126.171 23.544 123.803 23.544C122.907 23.544 122.075 23.48 121.307 23.352C120.539 23.224 119.877 23.032 119.323 22.776C118.789 22.4987 118.363 22.1573 118.043 21.752C117.744 21.3467 117.595 20.8667 117.595 20.312C117.595 19.8 117.701 19.3733 117.915 19.032C118.128 18.6693 118.384 18.3707 118.683 18.136C119.301 18.4773 120.005 18.7867 120.795 19.064C121.605 19.32 122.533 19.448 123.579 19.448C124.24 19.448 124.741 19.352 125.083 19.16C125.445 18.968 125.627 18.712 125.627 18.392C125.627 18.0933 125.499 17.8587 125.243 17.688C124.987 17.5173 124.56 17.3787 123.963 17.272L123.003 17.08C121.147 16.7173 119.76 16.152 118.843 15.384C117.947 14.5947 117.499 13.4747 117.499 12.024C117.499 11.2347 117.669 10.52 118.011 9.88C118.352 9.24 118.832 8.70667 119.451 8.28C120.069 7.85333 120.805 7.52267 121.659 7.288C122.533 7.05333 123.493 6.936 124.539 6.936C125.328 6.936 126.064 7 126.747 7.128C127.451 7.23467 128.059 7.40533 128.571 7.64C129.083 7.87467 129.488 8.184 129.787 8.568C130.085 8.93067 130.235 9.368 130.235 9.88C130.235 10.3707 130.139 10.7973 129.947 11.16C129.776 11.5013 129.552 11.7893 129.275 12.024C129.104 11.9173 128.848 11.8107 128.507 11.704C128.165 11.576 127.792 11.4693 127.387 11.384C126.981 11.2773 126.565 11.192 126.139 11.128C125.733 11.064 125.36 11.032 125.019 11.032C124.315 11.032 123.771 11.1173 123.387 11.288C123.003 11.4373 122.811 11.6827 122.811 12.024C122.811 12.2587 122.917 12.4507 123.131 12.6C123.344 12.7493 123.749 12.888 124.347 13.016L125.339 13.24C127.387 13.7093 128.837 14.36 129.691 15.192C130.565 16.0027 131.003 17.0587 131.003 18.36ZM133.505 3.128C133.505 2.31733 133.771 1.63467 134.305 1.08C134.859 0.525332 135.585 0.247999 136.481 0.247999C137.377 0.247999 138.091 0.525332 138.625 1.08C139.179 1.63467 139.457 2.31733 139.457 3.128C139.457 3.93867 139.179 4.62133 138.625 5.176C138.091 5.73067 137.377 6.008 136.481 6.008C135.585 6.008 134.859 5.73067 134.305 5.176C133.771 4.62133 133.505 3.93867 133.505 3.128ZM139.201 22.968C138.966 23.0107 138.614 23.064 138.145 23.128C137.697 23.2133 137.238 23.256 136.769 23.256C136.299 23.256 135.873 23.224 135.489 23.16C135.126 23.096 134.817 22.968 134.561 22.776C134.305 22.584 134.102 22.328 133.953 22.008C133.825 21.6667 133.761 21.2293 133.761 20.696V7.672C133.995 7.62933 134.337 7.576 134.785 7.512C135.254 7.42667 135.723 7.384 136.193 7.384C136.662 7.384 137.078 7.416 137.441 7.48C137.825 7.544 138.145 7.672 138.401 7.864C138.657 8.056 138.849 8.32267 138.977 8.664C139.126 8.984 139.201 9.41067 139.201 9.944V22.968ZM150.248 6.968C151.464 6.968 152.563 7.128 153.544 7.448C154.547 7.74667 155.389 8.14133 156.072 8.632C156.499 8.93067 156.829 9.26133 157.064 9.624C157.32 9.98667 157.448 10.456 157.448 11.032V22.232C157.448 23.3627 157.235 24.3333 156.808 25.144C156.381 25.976 155.795 26.6587 155.048 27.192C154.323 27.7467 153.459 28.152 152.456 28.408C151.475 28.664 150.419 28.792 149.288 28.792C147.347 28.792 145.821 28.5253 144.712 27.992C143.603 27.48 143.048 26.6373 143.048 25.464C143.048 24.9733 143.144 24.536 143.336 24.152C143.549 23.7893 143.784 23.512 144.04 23.32C144.659 23.6613 145.352 23.9493 146.12 24.184C146.909 24.4187 147.72 24.536 148.552 24.536C149.704 24.536 150.621 24.344 151.304 23.96C151.987 23.576 152.328 22.9573 152.328 22.104V21.592C151.453 21.976 150.387 22.168 149.128 22.168C148.168 22.168 147.251 22.0293 146.376 21.752C145.523 21.4533 144.765 21.0053 144.104 20.408C143.464 19.7893 142.941 19 142.536 18.04C142.152 17.08 141.96 15.9387 141.96 14.616C141.96 13.3147 142.163 12.184 142.568 11.224C142.995 10.264 143.571 9.47467 144.296 8.856C145.043 8.216 145.917 7.74667 146.92 7.448C147.944 7.128 149.053 6.968 150.248 6.968ZM152.232 11.608C152.083 11.5227 151.859 11.4373 151.56 11.352C151.283 11.2667 150.931 11.224 150.504 11.224C149.459 11.224 148.669 11.5227 148.136 12.12C147.624 12.696 147.368 13.528 147.368 14.616C147.368 15.8533 147.624 16.7493 148.136 17.304C148.669 17.8373 149.341 18.104 150.152 18.104C151.027 18.104 151.72 17.9013 152.232 17.496V11.608ZM176.18 22.968C175.967 23.032 175.626 23.096 175.156 23.16C174.708 23.224 174.239 23.256 173.748 23.256C173.279 23.256 172.852 23.224 172.468 23.16C172.106 23.096 171.796 22.968 171.54 22.776C171.284 22.584 171.082 22.328 170.932 22.008C170.804 21.6667 170.74 21.2293 170.74 20.696V13.592C170.74 12.7173 170.516 12.1093 170.068 11.768C169.642 11.4053 169.108 11.224 168.468 11.224C168.042 11.224 167.636 11.2773 167.252 11.384C166.868 11.4907 166.559 11.6187 166.324 11.768V22.968C166.111 23.032 165.77 23.096 165.3 23.16C164.852 23.224 164.383 23.256 163.892 23.256C163.423 23.256 162.996 23.224 162.612 23.16C162.25 23.096 161.94 22.968 161.684 22.776C161.428 22.584 161.226 22.328 161.076 22.008C160.948 21.6667 160.884 21.2293 160.884 20.696V2.136C161.119 2.09333 161.46 2.04 161.908 1.976C162.378 1.89067 162.847 1.848 163.316 1.848C163.786 1.848 164.202 1.88 164.564 1.944C164.948 2.008 165.268 2.136 165.524 2.328C165.78 2.52 165.972 2.78667 166.1 3.128C166.25 3.448 166.324 3.87467 166.324 4.408V7.544C166.602 7.43733 167.018 7.32 167.572 7.192C168.148 7.04267 168.778 6.968 169.46 6.968C171.572 6.968 173.215 7.50133 174.388 8.568C175.583 9.61333 176.18 11.1813 176.18 13.272V22.968ZM184.979 17.656C184.979 18.2107 185.15 18.6053 185.491 18.84C185.854 19.0747 186.355 19.192 186.995 19.192C187.315 19.192 187.646 19.1707 187.987 19.128C188.328 19.064 188.627 18.9893 188.883 18.904C189.075 19.1387 189.235 19.4053 189.363 19.704C189.512 19.9813 189.587 20.3227 189.587 20.728C189.587 21.5387 189.278 22.2 188.659 22.712C188.062 23.224 186.995 23.48 185.459 23.48C183.582 23.48 182.131 23.0533 181.107 22.2C180.104 21.3467 179.603 19.96 179.603 18.04V4.344C179.838 4.28 180.168 4.216 180.595 4.152C181.043 4.06667 181.512 4.024 182.003 4.024C182.942 4.024 183.667 4.19467 184.179 4.536C184.712 4.856 184.979 5.54933 184.979 6.616V8.664H189.171C189.299 8.89867 189.416 9.19733 189.523 9.56C189.651 9.90133 189.715 10.2853 189.715 10.712C189.715 11.4587 189.544 12.0027 189.203 12.344C188.883 12.664 188.446 12.824 187.891 12.824H184.979V17.656Z'
        fill='#09BC8A'
      />
    </svg>
  );
};

import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';

interface IProps {}
const BrandReachBottom: React.FC<IProps> = (props) => {
  return (
    <Flex
      mb='84px'
      flexDirection='column'
      mt='152px'
      w='full'
      alignItems='center'
    >
      <Text
        mb='59px'
        fontWeight='500'
        fontSize='32px'
        lineHeight='38px'
        color='#97A5B0'
        letterSpacing='0.05em'
      >
        Oops you already reach the bottom
      </Text>
      <svg
        width='173'
        height='164'
        viewBox='0 0 173 164'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clip-path='url(#clip0_255_3249)'>
          <path
            d='M44.9923 89.7484C45.5491 91.4003 45.1502 93.0273 44.1015 93.3823C43.0528 93.7374 41.7517 92.6861 41.195 91.0335C40.9635 90.3764 40.8924 89.6734 40.9876 88.9831L38.7168 81.9541L42.0297 80.9561L43.9166 87.9914C44.41 88.4825 44.7789 89.085 44.9923 89.7484Z'
            fill='#FFB6B6'
          />
          <path
            d='M46.3832 49.9375C46.3832 49.9375 41.3809 50.1555 41.1634 52.772C40.9459 55.3886 34.7324 71.7083 34.7324 71.7083L39.6185 86.6756L43.4187 84.2264L41.2472 72.5247L48.5762 61.3671L46.3832 49.9375Z'
            fill='#09BC8A'
          />
          <path
            d='M156.465 35.8769C156.465 25.6377 147.833 20.0051 137.972 17.3373C125.33 13.9169 116.071 20.8382 119.479 35.8769C120.252 39.2852 122.099 43.266 124.386 46.6712H142.533C148.595 42.7148 156.465 43.8243 156.465 35.8769Z'
            fill='#09BC8A'
          />
          <path
            d='M33.9026 156.281L36.5496 156.678L39.5295 144.907L35.6232 144.32L33.9026 156.281Z'
            fill='#FFB6B6'
          />
          <path
            d='M42.3145 162.982C42.2581 163.432 41.8941 163.756 41.5015 163.707L36.2317 163.042C36.2317 163.042 35.9753 160.887 33.9738 159.721L33.4529 162.692L30.7344 162.349L31.6667 157.584C31.6667 157.584 31.2621 154.921 32.9372 153.797C34.6124 152.673 33.3662 152.702 33.3662 152.702L34.3335 149.802L38.3807 150.804L37.825 155.478L39.2371 160.364L41.9795 162.181C42.2236 162.343 42.3552 162.658 42.3145 162.982L42.3145 162.982Z'
            fill='#2F2E41'
          />
          <path
            d='M66.0442 157L68.72 157.063L70.2115 145.012L66.2627 144.918L66.0442 157Z'
            fill='#FFB6B6'
          />
          <path
            d='M75.2247 162.597C75.2247 163.05 74.9039 163.417 74.5082 163.417H69.1969C69.1969 163.417 68.6742 161.311 66.5432 160.405L66.3961 163.417H63.6562L63.9882 158.573C63.9882 158.573 63.2553 155.981 64.7774 154.656C66.2996 153.331 65.0667 153.516 65.0667 153.516L65.6655 150.518L69.8058 151.006L69.8362 155.712L71.8455 160.384L74.7925 161.844C75.0548 161.974 75.2246 162.27 75.2246 162.597L75.2247 162.597Z'
            fill='#2F2E41'
          />
          <path
            d='M46.0416 77.5599L40.8852 94.6414L41.8119 120.469L34.376 146.817H40.2799L52.5814 120.824L55.9059 97.788L65.0977 147.755H70.8101L69.4777 95.3834L65.3219 77.1104L46.0416 77.5599Z'
            fill='#2F2E41'
          />
          <path
            d='M59.2688 43.6214L51.8705 43.1719L49.8528 47.2175L42.4546 51.2631L47.8351 65.6476L43.4188 85.5864C43.4188 85.5864 47.9624 81.3525 53.1909 86.675C60.934 94.5572 68.9349 90.757 68.9349 90.757L64.3203 69.8026L65.949 52.386C66.1582 51.0121 68.0744 49.3001 66.7633 48.8483L61.2865 46.5432L59.2688 43.6214H59.2688Z'
            fill='#09BC8A'
          />
          <path
            d='M57.6356 46.1787H48.787C48.7999 45.5758 48.7116 44.9774 48.5296 44.435C48.5244 45.0369 48.4332 45.6306 48.2616 46.1787H47.8597C47.245 46.1778 46.7468 45.4553 46.7461 44.5638C44.6668 42.2486 44.9395 39.408 46.7461 36.2249C46.7465 32.142 49.1536 26.0215 51.7692 28.5827C51.8535 28.5763 53.1795 27.7246 53.2639 27.7246C55.5649 27.7273 56.3562 30.7387 57.0511 33.92C57.8429 33.3908 58.3884 35.5996 58.7831 39.4873C58.8983 40.6218 59.0006 41.8993 59.0925 43.2935C59.3462 44.4632 58.8979 45.7097 58.0913 46.0776C57.9436 46.1449 57.7898 46.1794 57.635 46.1798L57.6356 46.1787L57.6356 46.1787Z'
            fill='#2F2E41'
          />
          <path
            d='M55.827 42.5951C59.4181 42.5951 62.3293 39.6766 62.3293 36.0764C62.3293 32.4762 59.4181 29.5576 55.827 29.5576C52.2359 29.5576 49.3247 32.4762 49.3247 36.0764C49.3247 39.6766 52.2359 42.5951 55.827 42.5951Z'
            fill='#FFB6B6'
          />
          <path
            d='M56.4482 46.3997C55.839 47.2138 54.7735 47.5377 53.8159 47.2L50.9202 46.1788C50.6492 46.1788 50.4186 46.0197 50.406 45.8134L50.4045 45.7907C50.3754 45.3608 49.5836 45.2885 49.3998 45.6955C49.3258 45.8593 49.2416 46.0206 49.1473 46.1788H48.6226V33.4941C48.6226 31.3184 50.938 29.5547 53.7943 29.5547H53.7943C56.233 29.5547 58.3403 30.8523 58.8513 32.6686C58.8513 32.6686 62.4766 36.0556 60.3399 37.9598C58.2033 39.864 61.3117 41.414 61.3117 41.414C61.9291 43.6082 59.9667 47.1745 57.1882 47.9009C56.8614 47.9864 56.7947 46.3997 56.4482 46.3997V46.3997Z'
            fill='#2F2E41'
          />
          <path
            d='M63.9281 35.109C63.6615 35.4886 62.9648 36.4839 60.7914 36.3307C60.2379 36.2908 58.2718 35.7483 56.8408 35.775C55.8925 35.7916 55.3086 35.785 54.1409 35.775C52.7606 35.7616 52.3826 35.735 52.116 35.442C51.5996 34.8726 52.0249 33.8603 51.7785 33.7771C51.5726 33.7071 51.0394 34.3331 50.766 35.109C50.1923 36.7373 52.251 39.005 52.4535 41.1028C52.6695 43.3638 50.5433 39.0316 50.766 41.1028C51.0157 43.4337 51.9101 43.2572 51.9 44.0997C51.8966 44.2262 51.8595 44.3361 51.7785 44.4327C51.7076 44.5192 51.6367 44.5525 50.4285 44.7656C48.9841 45.022 48.2585 45.1486 48.0661 45.0986C47.57 44.9721 47.0671 44.2695 46.7161 43.7667C46.1356 42.9442 46.5474 43.7733 46.7161 42.7677C46.8781 41.7954 47.3844 41.6689 47.3911 40.7698C47.3979 39.6376 46.598 39.2947 46.0411 38.1059C45.0118 35.9082 46.0175 33.3642 46.3786 32.4451C46.5521 32.0044 46.8666 31.4465 47.418 30.5249C47.8606 29.785 48.448 29.1333 49.1644 28.6449C50.2381 27.913 51.4853 27.4114 52.8337 27.2127C53.5723 27.1039 54.3253 27.161 55.0515 27.3332L56.9324 27.7791C57.723 27.9665 58.4683 28.3062 59.1255 28.7787C59.738 28.7807 60.2692 29.1713 60.4792 29.739C60.5012 29.7984 60.5212 29.833 60.5376 29.8279C63.9281 28.7822 63.9258 31.8794 63.8886 33.8142C63.8848 34.0122 63.892 34.1875 63.918 34.3298V34.3398C63.9855 34.7227 64.0024 35.0024 63.9281 35.109L63.9281 35.109Z'
            fill='#2F2E41'
          />
          <path
            d='M24.0224 158.838C23.4616 158.874 23.1517 158.175 23.5759 157.768L23.6181 157.6C23.6126 157.586 23.6071 157.573 23.6015 157.559C23.033 156.201 22.0151 157.483 20.5483 157.575C18.3911 157.709 18.4233 159.344 19.259 161.257C19.4858 161.776 17.5601 157.587 17.5601 154.775C17.5601 154.068 17.5987 153.361 17.6775 152.657C17.7424 152.08 17.8318 151.507 17.9476 150.939C18.5734 147.87 19.9287 144.947 21.8836 142.506C22.8233 141.991 23.607 141.186 24.0804 140.221C24.2504 139.873 25.7116 139.579 25.7747 139.198C25.6677 139.212 24.0436 137.498 24.1242 137.398C23.9752 137.171 23.7084 137.059 23.5456 136.838C22.7361 135.737 21.6208 135.929 21.0385 137.425C19.7947 138.054 19.7826 139.098 20.5458 140.102C21.0314 140.74 21.0981 141.604 21.5242 142.288C21.4803 142.344 21.4347 142.399 21.3909 142.455C21.3741 142.477 21.3573 142.498 21.3405 142.52C20.6528 143.412 19.2797 143.184 18.8967 142.124C18.8688 142.046 18.6318 146.234 18.8101 141.9C18.9885 137.565 17.4334 139.772 16.646 138.772C15.7056 137.578 13.7926 138.121 13.6269 139.633C13.6254 139.647 13.6238 139.662 13.6223 139.676C13.7387 139.742 13.8528 139.812 13.9642 139.886C14.5992 140.307 14.3795 141.294 13.6271 141.41L13.61 141.413C13.6521 141.833 13.724 142.249 13.8292 142.659C12.8246 146.554 14.9927 147.973 18.089 148.037L18.2504 148.268C17.9572 149.113 17.7213 149.979 17.5443 150.857C17.3777 151.671 17.262 152.493 17.1972 153.319L17.1945 153.355C17.1407 154.057 16.2538 154.356 15.808 153.811C15.6946 153.673 15.5785 153.551 15.4614 153.455C14.119 152.349 12.2223 151.942 10.774 151.053C10.0769 150.625 9.18349 151.178 9.30516 151.989L9.31108 152.027C9.52673 152.115 9.73711 152.217 9.94049 152.331C10.057 152.397 10.1712 152.467 10.2827 152.541C10.9178 152.962 10.6979 153.95 9.94526 154.065L9.9282 154.068C9.91594 154.07 9.90541 154.072 9.89316 154.073L9.9043 154.1C10.3885 155.242 11.5458 155.981 12.7817 155.914C14.2365 155.834 16.0434 157.053 17.6372 159.209L17.639 159.209C17.9546 160.587 18.4157 161.934 19.0083 163.217H23.8998C23.9173 163.162 23.9331 163.106 23.9489 163.052C23.4966 163.08 23.0407 163.053 22.5954 162.971C22.9583 162.524 23.3212 162.074 23.6841 161.628C23.6929 161.619 23.6999 161.61 23.7069 161.601C23.891 161.373 24.0769 161.146 24.261 160.918L24.2611 160.917C24.2726 160.216 24.1887 159.517 24.0225 158.838L24.0224 158.838L24.0224 158.838Z'
            fill='#F2F2F2'
          />
          <path
            d='M0 163.676C0 163.856 0.143875 164 0.323039 164H98.3942C98.5734 164 98.7173 163.856 98.7173 163.676C98.7173 163.497 98.5734 163.353 98.3942 163.353H0.323039C0.143875 163.353 0 163.497 0 163.676Z'
            fill='#CCCCCC'
          />
          <path
            d='M147.112 8.57257V37.4188C147.112 39.9698 145.042 42.0451 142.497 42.0451H113.724C111.179 42.0451 109.109 39.9698 109.109 37.4188V8.57257C109.109 6.02158 111.179 3.94629 113.724 3.94629H142.497C145.042 3.94629 147.112 6.02158 147.112 8.57257ZM142.497 41.5008C144.746 41.5008 146.569 39.6732 146.569 37.4188V22.8757C146.569 12.7219 138.358 4.49056 128.23 4.49056H113.724C111.475 4.49056 109.652 6.31814 109.652 8.57257V37.4188C109.652 39.6732 111.475 41.5008 113.724 41.5008H142.497Z'
            fill='#3F3D56'
          />
          <path
            d='M124.702 64.3574H115.413C115.179 64.3574 114.988 64.1664 114.988 63.9316C114.988 63.6968 115.179 63.5059 115.413 63.5059H124.702C124.936 63.5059 125.127 63.6968 125.127 63.9316C125.127 64.1664 124.936 64.3574 124.702 64.3574V64.3574Z'
            fill='#3F3D56'
          />
          <path
            d='M167.591 0.851538H158.302C158.068 0.851538 157.877 0.660503 157.877 0.425724C157.877 0.190946 158.068 0 158.302 0H167.591C167.825 0 168.015 0.190946 168.015 0.425724C168.015 0.660503 167.825 0.851536 167.591 0.851536V0.851538Z'
            fill='#3F3D56'
          />
          <path
            d='M167.591 9.93064H158.302C158.068 9.93064 157.877 9.7396 157.877 9.50483C157.877 9.27005 158.068 9.0791 158.302 9.0791H167.591C167.825 9.0791 168.015 9.27005 168.015 9.50483C168.015 9.7396 167.825 9.93064 167.591 9.93064V9.93064Z'
            fill='#3F3D56'
          />
          <path
            d='M172.575 5.39451H153.317C153.083 5.39451 152.892 5.20347 152.892 4.96869C152.892 4.73391 153.083 4.54297 153.317 4.54297H172.575C172.81 4.54297 173 4.73391 173 4.96869C173 5.20347 172.81 5.3945 172.575 5.3945V5.39451Z'
            fill='#3F3D56'
          />
          <path
            d='M153.351 71.9797H113.185C110.788 71.9797 108.838 70.0246 108.838 67.6213V52.9346C108.838 50.5313 110.788 48.5762 113.185 48.5762H153.351C155.748 48.5762 157.698 50.5313 157.698 52.9346V67.6213C157.698 70.0246 155.748 71.9797 153.351 71.9797ZM113.185 49.1204C111.087 49.1204 109.381 50.8314 109.381 52.9346V67.6213C109.381 69.7245 111.087 71.4354 113.185 71.4354H153.351C155.449 71.4354 157.155 69.7245 157.155 67.6213V52.9346C157.155 50.8314 155.449 49.1204 153.351 49.1204H113.185Z'
            fill='#3F3D56'
          />
          <path
            d='M168.772 46.6718H163.924C155.701 46.6718 149.012 39.9652 149.012 31.7217V26.8618C149.012 25.1803 150.376 23.8125 152.053 23.8125H168.772C170.449 23.8125 171.813 25.1803 171.813 26.8618V43.6225C171.813 45.3039 170.449 46.6718 168.772 46.6718ZM152.053 24.3568C150.673 24.3568 149.555 25.4782 149.555 26.8617V31.7217C149.555 39.6778 155.988 46.1275 163.924 46.1275H168.772C170.152 46.1275 171.27 45.006 171.27 43.6226V32.9472C171.27 28.2028 167.434 24.3568 162.702 24.3568H152.053Z'
            fill='#3F3D56'
          />
          <path
            d='M69.6074 91.4612C69.7333 93.2003 70.7304 94.5449 71.8343 94.4643C72.9383 94.3838 73.7308 92.9089 73.6046 91.1692C73.5637 90.4736 73.3573 89.7979 73.0025 89.1987L72.3762 81.8369L68.9365 82.2052L69.9191 89.4235C69.6544 90.068 69.5475 90.7668 69.6074 91.4612Z'
            fill='#FFB6B6'
          />
          <path
            d='M64.3418 48.5762C64.3418 48.5762 69.3441 48.7942 69.5616 51.4107C69.7791 54.0272 72.1715 70.8165 72.1715 70.8165L73.2589 87.6057L69.3441 88.2598L64.5918 68.418L64.3418 48.5762H64.3418Z'
            fill='#09BC8A'
          />
          <path
            d='M137.701 55.2336C138.733 53.2607 140.042 51.8373 141.484 50.7539H124.487C128.861 57.0186 134.663 61.0393 137.701 55.2336Z'
            fill='#09BC8A'
          />
        </g>
        <defs>
          <clipPath id='clip0_255_3249'>
            <rect width='173' height='164' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <Button
        mt='19px'
        color='white'
        bgColor='#09BC8A'
        fontWeight='500'
        fontSize='14px'
        width='319px'
        height='41px'
        _hover={{
          bgColor: '#07A377',
        }}
      >
        Search Again
      </Button>
      <Button
        variant='outline'
        mt='12px'
        borderColor='#09BC8A'
        fontWeight='500'
        color='#09BC8A'
        fontSize='14px'
        width='319px'
        height='41px'
      >
        Request Screen
      </Button>
    </Flex>
  );
};

export default BrandReachBottom;

import React from 'react';
import { Box, Text } from 'zmp-ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, selectedCategoryIdState } from 'state';
import { useNavigate } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import * as image from 'components/cloudIMG';

export const Categories = () => {
  const categories = useRecoilValue(categoriesState);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  // Make sure there are exactly 6 categories or adjust this list accordingly
  const categoryIcons: { [key: string]: any } = {
    statistics: image.statisticLogo,
    treatment: image.treatmentLogo,
    survey: image.surveyLogo,
    calendar: image.calendarLogo,
    scroll1: image.scroll1,
    scroll2: image.scroll2,
  };

  return (
    <Box className="bg-white p-4">
      <Box
        className="grid grid-cols-3 gap-4"
        style={{ gridTemplateRows: 'repeat(2, auto)' }} // Tạo 2 hàng
      >
        {categories.slice(0, 6).map((category, i) => ( // Giới hạn phần tử đến 6
          <div
            key={i}
            onClick={() => gotoCategory(category.id)}
            className="flex flex-col space-y-2 items-center"
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: "25%",
              padding: "10px",
            }}
          >
            <AdvancedImage 
              className="w-12 h-12" 
              cldImg={categoryIcons[category.id]} 
              alt={category.name} 
            />
            <Text size="xxSmall" className="text-gray">
              {category.name}
            </Text>
          </div>
        ))}
      </Box>
    </Box>
  );
};
